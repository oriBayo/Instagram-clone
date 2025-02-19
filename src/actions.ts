'use server';

import { prisma } from '@/db';
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { uniq } from 'lodash';

export const getSessionEmail = async (): Promise<string | null | undefined> => {
  const session = await auth();
  const userEmail = session?.user?.email;
  return userEmail;
};

export const getSessionEmailOrThrow = async (): Promise<string> => {
  const userEmail = await getSessionEmail();

  if (!userEmail) {
    throw 'Not Logged in';
  }
  return userEmail;
};

export async function updateProfile(data: FormData) {
  const userEmail = await getSessionEmailOrThrow();
  const newUserInfo = {
    avatar: data.get('avatar') as string,
    username: data.get('username') as string,
    name: data.get('name') as string,
    subtitle: data.get('subtitle') as string,
    bio: data.get('bio') as string,
  };

  await prisma.profile.upsert({
    where: {
      email: userEmail,
    },
    update: newUserInfo,
    create: {
      email: userEmail,
      ...newUserInfo,
    },
  });
  redirect('/profile');
}

export const postEntry = async (data: FormData) => {
  const userEmail = await getSessionEmailOrThrow();
  const postDoc = await prisma.post.create({
    data: {
      author: userEmail,
      image: data.get('imageUrl') as string,
      description: data.get('description') as string,
    },
  });

  return postDoc.id;
};

export const createComment = async (data: FormData, postId: string) => {
  const userEmail = await getSessionEmailOrThrow();
  await prisma.comment.create({
    data: {
      author: userEmail,
      text: data.get('text') as string,
      postId: postId,
    },
  });
};

export const likePost = async (postId: string) => {
  const userEmail = await getSessionEmailOrThrow();

  await prisma.$transaction([
    // Create the like
    prisma.like.create({
      data: {
        author: userEmail,
        postId,
      },
    }),
    // Update the likesCount
    prisma.post.update({
      where: { id: postId },
      data: {
        likesCount: { increment: 1 },
        updatedAt: new Date(),
      },
    }),
  ]);
};

export const removeLikeFromPost = async (postId: string) => {
  const userEmail = await getSessionEmailOrThrow();

  await prisma.$transaction([
    // Delete the like
    prisma.like.deleteMany({
      where: {
        postId,
        author: userEmail,
      },
    }),
    // Decrement the likesCount
    prisma.post.update({
      where: { id: postId },
      data: {
        likesCount: { decrement: 1 },
        updatedAt: new Date(),
      },
    }),
  ]);
};

export const getSinglePostData = async (postId: string) => {
  // Fetch post details
  const post = await prisma.post.findFirstOrThrow({ where: { id: postId } });

  // Fetch user profile
  const profile = await prisma.profile.findFirstOrThrow({
    where: { email: post.author },
  });

  // Fetch comments for the post
  const comments = await prisma.comment.findMany({
    where: { postId: postId },
  });

  // Fetch unique authors of the comments
  const uniqueAuthors = uniq(comments.map((c) => c.author));
  const commentsAuthors = await prisma.profile.findMany({
    where: {
      email: { in: uniqueAuthors },
    },
  });

  // Fetch my like
  const myLike = await prisma.like.findFirst({
    where: {
      postId: postId,
      author: await getSessionEmailOrThrow(),
    },
  });
  return { post, profile, comments, commentsAuthors, myLike };
};

export const followProfile = async (profileIdToFollow: string) => {
  const sessionProfile = await prisma.profile.findFirstOrThrow({
    where: { email: await getSessionEmailOrThrow() },
  });
  await prisma.follower.create({
    data: {
      followedProfileId: profileIdToFollow,
      followingProfileId: sessionProfile.id,
      followingProfileEmail: sessionProfile.email,
    },
  });
};

export const unfollowProfile = async (profileIdToUnfollow: string) => {
  const sessionProfile = await prisma.profile.findFirstOrThrow({
    where: { email: await getSessionEmailOrThrow() },
  });
  await prisma.follower.deleteMany({
    where: {
      followedProfileId: profileIdToUnfollow,
      followingProfileId: sessionProfile.id,
    },
  });
};

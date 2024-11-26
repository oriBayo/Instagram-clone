'use server';

import { prisma } from '@/db';
import { redirect } from 'next/navigation';
import { auth } from './auth';

export const getSessionEmailOrThrow = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;

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

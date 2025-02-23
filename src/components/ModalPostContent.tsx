import React, { Suspense } from 'react';
import { getSinglePostData } from '@/actions';
import SinglePostContent from '@/components/SinglePostContent';
import Loading from './Loading';

const ModalPostContent = async ({ postId }: { postId: string }) => {
  const { post, profile, commentsAuthors, myLike, comments, bookmark } =
    await getSinglePostData(postId);
  return (
    <Suspense fallback={<Loading />}>
      <SinglePostContent
        post={post}
        authorProfile={profile}
        commentsAuthors={commentsAuthors}
        comments={comments}
        myLike={myLike}
        bookmark={bookmark}
      />
    </Suspense>
  );
};

export default ModalPostContent;

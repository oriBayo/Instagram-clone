import { getSinglePostData } from '@/actions';
import SinglePostContent from '@/components/SinglePostContent';

const SinglePostPage = async ({ params }: { params: { id: string } }) => {
  const { id: postId } = await Promise.resolve(params);
  const { post, profile, commentsAuthors, myLike, comments } =
    await getSinglePostData(postId);
  return (
    <SinglePostContent
      post={post}
      authorProfile={profile}
      commentsAuthors={commentsAuthors}
      comments={comments}
      myLike={myLike}
    />
  );
};

export default SinglePostPage;

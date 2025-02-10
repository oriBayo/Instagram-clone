import { getSinglePostData } from '@/actions';
import SinglePostContent from '@/components/SinglePostContent';

const SinglePostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const { post, profile, commentsAuthors, myLike, comments } =
    await getSinglePostData(id);
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

import { getSinglePostData } from '@/actions';
import SinglePostContent from '@/components/SinglePostContent';

interface SinglePostProps {
  params: Promise<{ id: string }>;
}

const SinglePostPage = async ({ params }: SinglePostProps) => {
  const id = (await params).id;
  const { post, profile, commentsAuthors, myLike, comments, bookmark } =
    await getSinglePostData(id);
  return (
    <SinglePostContent
      bookmark={bookmark}
      post={post}
      authorProfile={profile}
      commentsAuthors={commentsAuthors}
      comments={comments}
      myLike={myLike}
    />
  );
};

export default SinglePostPage;

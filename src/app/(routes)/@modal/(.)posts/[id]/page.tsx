import { getSinglePostData } from '@/actions';
import Modal from '@/components/Modal';
import SinglePostContent from '@/components/SinglePostContent';

const PostInModal = async ({ params }: { params: { id: string } }) => {
  const { id: postId } = await Promise.resolve(params);
  const { post, profile, commentsAuthors, myLike, comments } =
    await getSinglePostData(postId);
  return (
    <Modal>
      <SinglePostContent
        post={post}
        authorProfile={profile}
        commentsAuthors={commentsAuthors}
        comments={comments}
        myLike={myLike}
      />
    </Modal>
  );
};

export default PostInModal;

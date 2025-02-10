import { getSinglePostData } from '@/actions';
import Modal from '@/components/Modal';
import SinglePostContent from '@/components/SinglePostContent';

const PostInModal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const { post, profile, commentsAuthors, myLike, comments } =
    await getSinglePostData(id);
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

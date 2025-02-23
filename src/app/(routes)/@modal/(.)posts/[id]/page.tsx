import Modal from '@/components/Modal';
import ModalPostContent from '@/components/ModalPostContent';

const PostInModal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return (
    <Modal>
      <ModalPostContent postId={id} />
    </Modal>
  );
};

export default PostInModal;

import { useEffect } from 'react';
import Modal from 'react-modal';
import s from './ImageModal.module.css';

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleEscKey = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
      opacity: 0,
      transition: 'opacity 300ms ease-in-out',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%) scale(0.8)',
      opacity: 0,
      padding: '20px',
      border: 'none',
      borderRadius: '8px',
      maxWidth: '90%',
      maxHeight: '90%',
      overflow: 'auto',
      transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
    },
  };

  if (isOpen) {
    customStyles.overlay.opacity = 1;
    customStyles.content.opacity = 1;
    customStyles.content.transform = 'translate(-50%, -50%) scale(1)';
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Modal"
      closeTimeoutMS={300}
    >
      {image && (
        <>
          <button className={s.closeButton} onClick={onClose}>
            &times;
          </button>
          <div className={s.modalContent}>
            <img
              src={image.urls.regular}
              alt={image.alt_description || 'Зображення'}
              className={s.modalImage}
            />
            {image.description && (
              <p className={s.imageDescription}>{image.description}</p>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;

import './ImageModal.module.css';

const ImageModal = ({ isOpen, onClose, image }) => {
  console.log('Debugging line: ImageModal rendering with', image); // Debugging line

  if (!isOpen || !image) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <img src={image.src} alt={image.alt} className="modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;

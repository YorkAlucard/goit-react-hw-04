import s from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) return null; // Не рендеримо галерею, якщо немає зображень

  const handleImageClick = image => {
    onImageClick(image);
  };

  return (
    <ul className={s.gallery}>
      {images.map(image => (
        <li
          key={image.id}
          className={s.item}
          onClick={() => handleImageClick(image)}
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

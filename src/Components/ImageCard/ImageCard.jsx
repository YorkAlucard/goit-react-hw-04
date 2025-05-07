import s from './ImageCard.module.css';

const ImageCard = ({ image }) => {
  return (
    <div className={s.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={s.image}
      />
    </div>
  );
};

export default ImageCard;

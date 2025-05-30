import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <button className={s.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;

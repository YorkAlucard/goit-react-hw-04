import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, isVisible }) => {
  if (!isVisible) return null; // Не рендеримо кнопку, якщо немає зображень

  return (
    <button className={s.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;

import { ClipLoader } from 'react-spinners';
import s from './Loader.module.css';

const Loader = ({ isLoading }) => {
  return (
    <div className={s.loader}>
      {isLoading && <ClipLoader size={50} color="#007bff" />}
    </div>
  );
};

export default Loader;

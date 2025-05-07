import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { fetchImages } from '../Api/Api';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchImages(query, page);

        if (response.results.length === 0) {
          toast.error(
            'Немає результатів для вашого запиту. Спробуйте інше ключове слово.'
          );
          return;
        }

        setImages(prevImages =>
          page === 1 ? response.results : [...prevImages, ...response.results]
        );

        setTotalPages(Math.ceil(response.total / 12));
      } catch (error) {
        setError(
          `На жаль, виникла помилка. ${error.message} Спробуйте ще раз пізніше.`
        );
        toast.error('Помилка при завантаженні зображень!');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearchSubmit = searchQuery => {
    if (!searchQuery.trim()) {
      setError('Пошуковий запит не може бути порожнім.');
      toast.error('Будь ласка, введіть пошуковий запит!');
      return;
    }

    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    } else {
      toast.info('Ви досягли кінця результатів пошуку.');
    }
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  };

  const showLoadMoreButton = images.length > 0 && page < totalPages;

  return (
    <div className="app-container">
      <SearchBar onSubmit={handleSearchSubmit} />
      {err && <ErrorMessage message={err} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      <Loader isLoading={isLoading} />
      <LoadMoreBtn onClick={handleLoadMore} isVisible={showLoadMoreButton} />
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedImage}
      />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;

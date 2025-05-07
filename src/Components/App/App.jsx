import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { fetchImages } from '../Api/Api';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchImages(query, page);
        setImages(prevImages =>
          page === 1 ? response.results : [...prevImages, ...response.results]
        );
      } catch {
        setError('Oops! Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearchSubmit = searchQuery => {
    if (!searchQuery.trim()) {
      setError('Search query cannot be empty.');
      return;
    }

    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    console.log('Debugging line: Image clicked', image); // Debugging line
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    console.log('Debugging line: Closing modal');
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {err && <ErrorMessage message={err} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      <Loader isLoading={isLoading} />
      <LoadMoreBtn onClick={handleLoadMore} isVisible={images.length > 0} />
      {selectedImage && (
        <ImageModal
          isOpen={selectedImage !== null}
          onClose={handleCloseModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;

import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = searchQuery => {
    setQuery(searchQuery); // Зберігаємо запит у стані
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <>Результати пошуку для: {query}</>
      <Toaster /> {/* Додайте компонент Toaster для відображення сповіщень */}
    </div>
  );
};

export default App;

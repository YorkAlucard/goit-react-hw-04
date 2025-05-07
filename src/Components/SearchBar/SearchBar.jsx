import { useState } from 'react';
import s from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!searchValue.trim()) {
      alert('Search query cannot be empty!');
      return;
    }

    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.searchForm}>
      <div className={s.inputWrapper}>
        <FaSearch className={s.searchIcon} />
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className={s.searchInput}
          placeholder="Search images..."
        />
      </div>
      <button type="submit" className={s.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;

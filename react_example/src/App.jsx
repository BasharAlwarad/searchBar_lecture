import { useState } from 'react';
import SearchList from './components/SearchList';
// import SearchBar from './components/SearchBar';
// import DebouncedSearchBar from './components/DebouncingSearch';
// import ThrottlingSearchBar from './components/ThrottlingSearchBar';
import FuzzySearchBar from './components/FuzzySearchBar';

function App() {
  // const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <h1>Search Bar</h1>
      {/* <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      /> */}
      {/* <DebouncedSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      /> */}
      {/* <ThrottlingSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      /> */}
      <FuzzySearchBar
        // searchTerm={searchTerm}
        // setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      />
      <SearchList searchResults={searchResults} />
    </>
  );
}

export default App;

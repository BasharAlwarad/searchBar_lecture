import {Routes,Route} from 'react-router-dom';
import { useState } from 'react';
import SearchList from './components/SearchList';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import DebouncedSearchBar from './components/DebouncingSearch';
import ThrottlingSearchBar from './components/ThrottlingSearchBar';
import FuzzySearchBar from './components/FuzzySearchBar';
import ReactSelectSearchBar from './components/ReactSelectSearchBar';
import StyledSearchBar from "./components/StyledSearchBar";
import ARIASearchBar from './components/ARIASearchBar';
import MemoSearchBar from './components/MemoSearchBar';
import BackEndFilterdSearchBar from './components/BackEndFilterdSearchBar';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <NavBar/>
      <div className="container">

      <Routes>
<Route path='/' element={<SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        />} />
<Route path='/SearchBar' element={<SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        />} />
<Route path='/DebouncedSearchBar' element={<DebouncedSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        /> } />
<Route path='/ThrottlingSearchBar' element={<ThrottlingSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      /> } />
<Route path='/FuzzySearchBar' element={<FuzzySearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        /> } />
<Route path='/ReactSelectSearchBar' element={<ReactSelectSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        /> } />
<Route path='/StyledSearchBar' element={<StyledSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        /> } />
<Route path='/ARIASearchBar' element={<ARIASearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        /> } />
<Route path='/MemoSearchBar' element={<MemoSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        />} />
<Route path='/BackEndFilterdSearchBar' element={<BackEndFilterdSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        />} />
        </Routes>
      <SearchList searchResults={searchResults} />
        </div>
    </>
  );
}

export default App;

/* eslint-disable react/prop-types */

import { useEffect } from 'react';

function SearchBar({ searchTerm, setSearchTerm, setSearchResults }) {
  // Function to fetch data from API
  async function fetchData() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.map((user) => user.name);
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  // Function to filter results based on user input
  function filterResults(input, data) {
    return data.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
  }

  useEffect(() => {
    async function updateSearchResults() {
      const data = await fetchData();
      const filteredResults = filterResults(searchTerm, data);
      setSearchResults(filteredResults);
    }
    updateSearchResults();
  }, [searchTerm, setSearchResults]); // Update search results whenever searchTerm changes

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;

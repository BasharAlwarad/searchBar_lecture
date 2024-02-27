/* eslint-disable react/prop-types */

import { useEffect } from 'react';

function DebouncedSearchBar({ searchTerm, setSearchTerm, setSearchResults }) {
  // Debounce function to delay execution of a function
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

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
    // Debounce the updateSearchResults function
    const debouncedUpdateSearchResults = debounce(async () => {
      const data = await fetchData();
      const filteredResults = filterResults(searchTerm, data);
      setSearchResults(filteredResults);
    }, 3000); // Set debounce delay to 300 milliseconds

    // Call the debounced function whenever searchTerm changes
    debouncedUpdateSearchResults();

    // Cleanup function to clear the timeout on unmount
    return () => clearTimeout(debouncedUpdateSearchResults);
  }, [searchTerm, setSearchResults]); // Update search results whenever searchTerm changes

  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default DebouncedSearchBar;

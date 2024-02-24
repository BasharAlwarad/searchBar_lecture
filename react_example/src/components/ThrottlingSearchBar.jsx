/* eslint-disable react/prop-types */

import { useEffect } from 'react';

function ThrottlingSearchBar({ searchTerm, setSearchTerm, setSearchResults }) {
  // Throttle function to limit the rate of function execution
  function throttle(func, delay) {
    let throttling = false;
    return function (...args) {
      if (!throttling) {
        throttling = true;
        setTimeout(() => {
          func.apply(this, args);
          throttling = false;
        }, delay);
      }
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
    // Throttle the updateSearchResults function
    const throttledUpdateSearchResults = throttle(async () => {
      const data = await fetchData();
      const filteredResults = filterResults(searchTerm, data);
      setSearchResults(filteredResults);
    }, 3000); // Set throttle delay to 300 milliseconds

    // Call the throttled function whenever searchTerm changes
    throttledUpdateSearchResults();

    // Cleanup function to clear the throttling flag on unmount
    return () => clearTimeout(throttledUpdateSearchResults);
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

export default ThrottlingSearchBar;

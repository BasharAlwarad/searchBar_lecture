/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';

function FuzzySearchBar({ setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  // Function to fetch data from API
  async function fetchData() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const userData = await response.json();
      setData(userData.map((user) => user.name));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to filter results based on user input
  function filterResults(input) {
    return data.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
  }

  // Function to perform fuzzy search
  function fuzzySearch(input) {
    // Simulate fuzzy search by matching input with any part of the item
    return data.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Apply fuzzy search if the search term is short
    const results =
      searchTerm.length < 3
        ? fuzzySearch(searchTerm)
        : filterResults(searchTerm);
    setFilteredResults(results);
    setSearchResults(results);
  }, [searchTerm, setSearchResults, filterResults]);

  return (
    <div style={{ position: 'relative' }}>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '8px 12px' }}
      />
      {searchTerm && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderTop: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            margin: 0,
            padding: 0,
          }}
        >
          {filteredResults.map((result, index) => (
            <li
              key={index}
              style={{
                listStyle: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc',
              }}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FuzzySearchBar;

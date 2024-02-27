/*eslint-disable react/prop-types*/
import { useEffect, useState } from 'react';
import Select from 'react-select';
import styled, { css } from 'styled-components';

const StyledSelect = styled(Select)`
  width: 100%;
  .css-w9q2zk-Input2{
    ${({ isFocused }) =>
      isFocused &&
      css`
        background-color: bisque;
        color: black;
      `}
  }
`;


function ARIASearchBar({ setSearchResults, searchTerm, setSearchTerm }) {
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

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
      setData(userData.map((user) => ({ value: user.name, label: user.name })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to filter results based on user input
  function filterResults(input) {
    return data.filter((item) =>
      item.label.toLowerCase().includes(input.toLowerCase())
    );
  }

  // Function to perform fuzzy search
  function fuzzySearch(input) {
    // Simulate fuzzy search by matching input with any part of the item
    return data.filter((item) =>
      item.label.toLowerCase().includes(input.toLowerCase())
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Apply fuzzy search if the search term is short
    const results =
      searchTerm.length < 3 ? fuzzySearch(searchTerm) : filterResults(searchTerm);
    setFilteredResults(results);
    setSearchResults(results.map((result) => result.value));
  }, [searchTerm, setSearchResults]);

  return (
    <StyledSelect
      options={filteredResults}
      value={filteredResults.find((option) => option.value === searchTerm)}
      onChange={(selectedOption) => setSearchTerm(selectedOption.value)}
      onInputChange={(inputValue) => setSearchTerm(inputValue)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder="Search..."
      isClearable
      isFocused={isFocused}
      inputId="search-input" // Assign an ID for ARIA attributes
      aria-labelledby="search-label" // Label for the input
      aria-expanded={filteredResults.length > 0} // Indicate if the search results are visible
      aria-controls="search-results" // ID of the element containing search results
      menuId="search-results" // Assign an ID for ARIA attributes
    />
  );
}

export default ARIASearchBar;

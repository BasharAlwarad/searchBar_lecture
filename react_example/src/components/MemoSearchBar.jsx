/*eslint-disable react/prop-types*/
import { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import styled, { css } from 'styled-components';

const StyledSelect = styled(Select)`
  width: 100%;
  .css-w9q2zk-Input2 {
    ${({ isFocused }) =>
      isFocused &&
      css`
        background-color: bisque;
        color: black;
      `}
  }
`;

function MemoSearchBar({ setSearchResults, searchTerm, setSearchTerm }) {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    fetchData();
  }, []);

  // Memoized filter function
  const filterResults = useMemo(() => {
    return (input) => {
      return data.filter((item) =>
        item.label.toLowerCase().includes(input.toLowerCase())
      );
    };
  }, [data]);

  // Memoized fuzzy search function
  const fuzzySearch = useMemo(() => {
    return (input) => {
      return data.filter((item) =>
        item.label.toLowerCase().includes(input.toLowerCase())
      );
    };
  }, [data]);

  useEffect(() => {
    // Apply fuzzy search if the search term is short
    const results =
      searchTerm.length < 3 ? fuzzySearch(searchTerm) : filterResults(searchTerm);
    setSearchResults(results.map((result) => result.value));
  }, [searchTerm, setSearchResults, filterResults, fuzzySearch]);

  return (
    <StyledSelect
      options={data}
      onChange={(selectedOption) => setSearchTerm(selectedOption.value)}
      onInputChange={(inputValue) => setSearchTerm(inputValue)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder="Search..."
      isClearable
      isFocused={isFocused}
      inputId="search-input"
      aria-labelledby="search-label"
      aria-expanded={data.length > 0}
      aria-controls="search-results" 
      menuId="search-results" 
    />
  );
}

export default MemoSearchBar;

/* eslint-disable react/prop-types */
const SearchList = ({ searchResults }) => {
  return (
    <ul>
      {searchResults?.length === 0 ? (
        <li>No results found</li>
      ) : (
        searchResults?.map((result) => <li key={result}>{result}</li>)
      )}
    </ul>
  );
};

export default SearchList;

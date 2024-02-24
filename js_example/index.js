// Function to fetch data from JSONPlaceholder API
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map((user) => user.name); // Extracting names for simplicity
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Function to perform filtering based on user input
function filterResults(input, data) {
  return data.filter((item) =>
    item.toLowerCase().includes(input.toLowerCase())
  );
}

// Function to update search results on the page
function updateResults(results) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    const noResultsItem = document.createElement('li');
    noResultsItem.textContent = 'No results found';
    searchResults.appendChild(noResultsItem);
  } else {
    results.forEach((result) => {
      const item = document.createElement('li');
      item.textContent = result;
      searchResults.appendChild(item);
    });
  }
}

// Event listener to capture user input
document
  .getElementById('searchInput')
  .addEventListener('input', async function (event) {
    const userInput = event.target.value.trim(); // Trim whitespace
    const data = await fetchData();
    const filteredResults = filterResults(userInput, data);
    updateResults(filteredResults);
  });

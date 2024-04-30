const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const resultList = document.getElementById('results-list');

searchButton.addEventListener('click', async () => {
  const searchTerm = searchBar.value;
  if (!searchTerm) {
    return; // Handle empty search
  }

  try {
    const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`); // Handle API errors
    }
    const data = await response.json();

    resultList.innerHTML = ''; // Clear previous results

    if (data.items && data.items.length > 0) {
      data.items.forEach(item => {
        const listItem = document.createElement('li');
        const userLink = document.createElement('a');
        userLink.href = item.html_url; // Link to user profile
        userLink.target = "_blank";
        userLink.textContent = item.login; // Username
        listItem.appendChild(userLink);
        resultList.appendChild(listItem);
      });
    } else {
      const noResults = document.createElement('li');
      noResults.textContent = 'No users found.';
      resultList.appendChild(noResults);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle errors by displaying a message to the user
  }
});

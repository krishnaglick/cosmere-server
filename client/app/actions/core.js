
/* globals $ */

export async function search(searchTerm, { searching }) {
  searching(true);
  let searchResults = [];
  try {
    searchResults = await $.get(`/api/wobs/${searchTerm}`);
  }
  catch(x) {
    console.error('Error getting search results: ', x);
  }
  searching(false);
  return { searchResults };
}

export function searching(searchRunning) {
  return {
    searching: searchRunning
  };
}

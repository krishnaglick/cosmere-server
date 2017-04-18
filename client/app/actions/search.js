
/* globals $ */

import _ from 'lodash';

export async function search(searchTerm, { isSearching }) {
  isSearching(true);
  let searchResults = [];
  try {
    searchResults = await $.get(`/api/wobs/${searchTerm}`);
    searchResults = _.map(searchResults, (result) => {
      result.editing = false;
      return result;
    });
  }
  catch(x) {
    console.error('Error getting search results: ', x);
  }
  isSearching(false);
  return {
    searchResults,
    searchTerm
  };
}

export function isSearching(searchRunning) {
  return {
    searching: searchRunning
  };
}

export function editResult(searchResults, i) {
  searchResults[i].editing = true;
  return { searchResults };
}

export function cancelEditResult(searchResults, i) {
  searchResults[i].editing = false;
  return { searchResults };
}

export function saveEditResult(searchResults, i) {
  searchResults[i].editing = false;
  return { searchResults };
}


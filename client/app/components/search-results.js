
import Inferno from 'inferno';
import _ from 'lodash';

import SearchResult from './search-pieces/search-result';
import SearchResultEdit from './search-pieces/search-result-edit';

function SearchResults({state, actions}) {

  const { searchResults, searching, account: { moderator } } = state;

  if(searching)
    return (
      <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
        Loading Results...
      </div>
    );

  if(!searchResults)
    return null;

  if(!searchResults.length) {
    return (
      <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
        <span>There are no results!</span>
      </div>
    );
  }

  return (
    <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
    {
      _.map(searchResults, (searchResult, i) => (
        searchResult.editing ?
        <SearchResultEdit
          searchResults={searchResults}
          searchResult={searchResult}
          i={i}
          actions={actions}
        /> :
        <SearchResult
          searchResults={searchResults}
          searchResult={searchResult}
          i={i}
          moderator={moderator}
          actions={actions}
        />
      ))
    }
    </div>
  );
}

export default SearchResults;

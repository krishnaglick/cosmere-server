
import Inferno from 'inferno';
import _ from 'lodash';

import SearchResults from './search-results';

function Search({ state, actions, params: { term }, browserHistory }) {
  if(term && !state.searching && state.searchTerm !== term)
    actions.search(term);

  const search = ({ target: { value } }) => {
    if(value && value !== term)
      browserHistory.push(`/search/${value}`);
  };
  const enterSearch = (e) => e.key === 'Enter' && search(e);

  return (
    <span>
      <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
        <div className='form-group row'>
          <input
            type='text'
            className='form-control'
            placeholder='Search for a WoB!'
            value={term}
            onInput={_.debounce((e) => search(e), 800)}
            onKeyPress={enterSearch}
          />
        </div>
      </div>
      <SearchResults state={state} actions={actions} />
    </span>
  );
}

export default Search;

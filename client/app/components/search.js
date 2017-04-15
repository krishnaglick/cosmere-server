
import Inferno from 'inferno';
import _ from 'lodash';

function Search({ state, actions, params: { term }, browserHistory }) {
  if(term && !state.searching && !state.searchResults)
    actions.search(term);

  let searchContent = null;
  if(state.searching)
    searchContent = (
      <div>Loading Results...</div>
    );
  if(!state.searchResults)
    searchContent = null;
  else if(!state.searchResults.length) {
    searchContent = (
      <div>
        <span>There are no results!</span>
      </div>
    );
  }
  else {
    searchContent = (
      <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
      {
        state.searchResults.map(({title, date, conversation, tags}) => (
          <div className='form-group'>
            <div className='row'>Title: {title}</div>
            <div className='row'>Date: {date}</div>
            {_.map(conversation, (line) => <div>{line}</div>)}
            <div className='row'>Tags: {tags.join(', ')}</div>
          </div>
        ))
      }
      </div>
    );
  }

  const search = ({ target: { value } }) => {
    if(value)
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
            onInput={_.debounce((e) => search(e), 500)}
            onKeyPress={enterSearch}
          />
        </div>
      </div>
      {searchContent}
    </span>
  );
}

export default Search;
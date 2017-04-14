
import Inferno from 'inferno';
import _ from 'lodash';

function Search({ state, actions }) {
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

  const search = _.debounce(({ target: { value } }) => {
    actions.search(value);
  }, 500);

  return (
    <span>
      <input type='text' placeholder='Search for a WoB!' onInput={search} />
      {searchContent}
    </span>
  );
}

export default Search;

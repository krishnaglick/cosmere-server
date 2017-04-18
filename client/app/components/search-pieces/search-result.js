
import Inferno from 'inferno';
import _ from 'lodash';

function SearchResult(props) {
  const { i, searchResult, searchResults, moderator, actions } = props;
  const { title, conversation, date, tags } = searchResult;
  const { editResult } = actions;
  return (
    <div className='form-group'>
      <span style={{float: 'right', display: moderator ? 'initial' : 'none'}}>
        <button type='button' className='btn btn-success' onClick={() => editResult(searchResults, i)}>Edit</button>
      </span>
      <div className='row'>
        Title: {title}
      </div>
      <div className='row'>Date: {date}</div>
      {_.map(conversation, (line) => <div>{line}</div>)}
      <div className='row'>Tags: {tags.join(', ')}</div>
    </div>
  );
}

export default SearchResult;

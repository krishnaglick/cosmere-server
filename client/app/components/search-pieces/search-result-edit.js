
import Inferno from 'inferno';

function SearchResultEdit(props) {
  const { i, searchResult, searchResults, actions } = props;
  const { title, conversation, date, tags } = searchResult;
  const { cancelEditResult, saveEditResult } = actions;
  return (
    <div className='form-group'>
      <div className='row'>
        Title: {title}
      </div>
      <div className='row'>Date: {date}</div>
      <div className='row'>
        <textarea id={`search-result-edit-conversation-${i}`} value={conversation.join('\n')} />
      </div>
      <div className='row'>
        <textarea id={`search-result-edit-tags-${i}`} value={tags.join('\n')} />
      </div>
      <div>
          <button type='button' className='btn btn-success' onClick={() => saveEditResult(searchResults, i)}>Save</button>
          <button type='button' className='btn btn-danger' onClick={() => cancelEditResult(searchResults, i)}>Cancel</button>
      </div>
    </div>
  );
}

export default SearchResultEdit;

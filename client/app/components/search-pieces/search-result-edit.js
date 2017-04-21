
import Inferno from 'inferno';

function SearchResultEdit(props) {
  const { i, searchResult, searchResults, actions } = props;
  const { title, conversation, date, tags } = searchResult;
  const { cancelEditResult, saveEditResult } = actions;
  return (
    <div className='card'>
      <div className='card-header'>
          <button type='button' className='btn btn-success searchAction' onClick={() => saveEditResult(searchResults, i)}>Save</button>
          <button type='button' className='btn btn-danger searchAction' onClick={() => cancelEditResult(searchResults, i)}>Cancel</button>
        <h4 className='card-title'>{title}</h4>
        <h6 className='card-subtitle mb-2 text-muted'>{date}</h6>
      </div>
      <div className='card-block'>
        <p className='card-text'>
          <textarea
            style={{resize: 'none', width: '55vw', height: '30vh'}}
            id={`search-result-edit-conversation-${i}`}
            value={conversation.join('\n')}
          />
        </p>
      </div>
      <div className='card-footer'>
        <textarea
          style={{resize: 'none', width: '55vw', height: '30vh'}}
          id={`search-result-edit-tags-${i}`}
          value={tags.join(', ')}
        />
        <small>
          <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'>Markdown</a> is used for styling
        </small>
      </div>
    </div>
  );
}

export default SearchResultEdit;

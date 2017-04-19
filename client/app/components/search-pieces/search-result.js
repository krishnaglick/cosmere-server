
import Inferno from 'inferno';
import _ from 'lodash';

function SearchResult(props) {
  const { i, searchResult, searchResults, moderator, actions } = props;
  const { title, conversation, date, tags } = searchResult;
  const { editResult } = actions;
  return (
    <div className='card'>
      <div className='card-header'>
        <button
          type='button'
          className='btn btn-success searchAction'
          onClick={() => editResult(searchResults, i)}
          style={{display: moderator ? 'initial' : 'none'}}
        >Edit</button>
        <h4 className='card-title'>{title}</h4>
        <h6 className='card-subtitle mb-2 text-muted'>{date}</h6>
      </div>
      <div className='card-block'>
        <p className='card-text'>
          {_.map(conversation, (line) => <div>{line}</div>)}
        </p>
      </div>
      <div className='card-footer'>
        {tags.join(', ')}
      </div>
    </div>
  );
}

export default SearchResult;

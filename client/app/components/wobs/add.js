
import Inferno from 'inferno';

function Add({ browserHistory, actions: { saveWoB } }) {
  const save = () => {
    const title = $('#add-wob-title').val();
    const date = $('#add-wob-date').val();
    const conversation = $('#add-wob-conversation').val();
    const tags = $('#add-wob-tags').val();
    if(!title)
      return alert('Please provide a title!');
    if(!date)
      return alert('Please provide a date!');
    if(!conversation)
      return alert('Please provide a conversation!');
    if(!tags)
      return alert('Please provide some tags!');

    saveWoB({title, date, conversation, tags});
  };

  //Not the best, but works for now.
  setTimeout(() => $('#add-wob-date').datepicker(), 1000);

  return (
    <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
      <div className='card'>
        <div className='card-header'>
          <button type='button' className='btn btn-success' onClick={save}>Save</button>
          <span style={{marginRight: '5px'}}></span>
          <button type='button' className='btn btn-danger' onClick={() => browserHistory.goBack()}>Cancel</button>
        </div>
        <div className='card-block'>
          <p className='card-text'>
            <div className='form-group'>
            <span className='card-subtitle mb-2 text-muted h6'>Title: </span>
              <div className='input-group'>
                <input type='text' className='form-control' id='add-wob-title' placeholder='Title' />
              </div>
            </div>
          </p>
          <p className='card-text'>
            <div className='form-group'>
              <span className='card-subtitle mb-2 text-muted h6'>Date: </span>
              <div className='input-group date'>
                <input type='text' className='form-control' id='add-wob-date' placeholder='Date' />
                <span className='input-group-addon'>
                  <i className='fa fa-calendar' aria-hidden='true'></i>
                </span>
              </div>
            </div>
          </p>
          <p className='card-text'>
            <span className='card-subtitle mb-2 text-muted h6'>Conversation: </span>
            <textarea
              style={{resize: 'none', height: '30vh'}}
              id={`add-wob-conversation`}
              placeholder='Conversation'
              className='form-control'
            />
          </p>
          <small>
            <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'>Markdown</a> is used for styling
          </small>
        </div>
        <div className='card-footer'>
          <textarea
            style={{resize: 'none', height: '30vh'}}
            id={`add-wob-tags`}
            placeholder='Tags'
            className='form-control'
          />
        </div>
      </div>
    </div>
  );
}

export default Add;

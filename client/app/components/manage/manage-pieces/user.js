
import Inferno from 'inferno';

function User({ user: { _id, username, admin, moderator }, saveUser }) {

  const save = () => {
    saveUser({
      username,
      admin: $(`#admin-edit-${_id}`)[0].checked,
      moderator: $(`#moderator-edit-${_id}`)[0].checked,
    });
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <button
          type='button'
          className='btn btn-success searchAction'
          onClick={save}
        >Save</button>
        <h4 className='card-title'>{username}</h4>
      </div>
      <div className='card-block settings'>
        <div className='row'>
          <div className='question'>
            Moderator
          </div>
          <div className='switch'>
            <input id={`moderator-edit-${_id}`} checked={moderator} className='cmn-toggle cmn-toggle-yes-no' type='checkbox' />
            <label for={`moderator-edit-${_id}`} data-on='Yes' data-off='No'></label>
          </div>
        </div>
        <div className='row'>
          <div className='question'>
            Admin
          </div>
          <div className='switch'>
            <input id={`admin-edit-${_id}`} checked={admin} className='cmn-toggle cmn-toggle-yes-no' type='checkbox' />
            <label for={`admin-edit-${_id}`} data-on='Yes' data-off='No'></label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;

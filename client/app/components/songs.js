
import Inferno from 'inferno';

import { Howl } from 'howler';

let player;

function Player({ state, actions }) {
  if(!state.songs)
    actions.songs();

  if(!state.songs)
    return (
      <div>Loading Your songs...</div>
    );
  if(!state.songs.length)
    return (
      <div>
        <span>There are no songs!</span>
      </div>
    );

  const playSong = ({ target: { textContent: songPath }}) => {
    player && player.stop();
    player = new Howl({
      src: [songPath]
    });

    player.play();
  };

  return (
    <span>
    <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
      {
        state.songs.map((path) => (
          <div className='form-group row' onClick={playSong}>
            {path}
          </div>
        ))
      }
    </div>
    </span>
  );
}

export default Player;

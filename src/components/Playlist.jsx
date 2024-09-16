import styles from '../css/TrackList.module.css';

import PropTypes from 'prop-types';

// PropTypes validation
Playlist.propTypes = {
    playlistMusic: PropTypes.array,
    handleSubmitPlaylist: PropTypes.func,
    handleInput: PropTypes.func,
    handleRemoveFromPlaylist: PropTypes.func,
    playlistNameInput: PropTypes.string,
};

function Playlist({ playlistMusic, handleSubmitPlaylist, playlistNameInput, handleInput, handleRemoveFromPlaylist }) {
    return (
        <div className={styles.tracklist_container}>
            <input className={styles.playlist_input} id='playlist-name' name='playlist-name' placeholder='Playlist name' value={playlistNameInput} onChange={handleInput} />
            {playlistMusic.length > 0 
                ? playlistMusic.map(item => (
                    <div className={styles.tracklist_items} key={item.id}>
                        <h1>Song: {item.name}</h1>
                        <h3>Artist: {item.artists['0'].name}</h3>
                        <p>Popularity: {item.popularity}</p>
                        <a className={styles.add_btn} onClick={() => {handleRemoveFromPlaylist(item)}}>-</a>
                    </div>
                )) 
                : <p>No tracks in the playlist</p>
            }
            {playlistMusic.length > 0 && <button type='button' onClick={() => {handleSubmitPlaylist()}}>Add to Spotify</button>}
        </div>
    )
}

export default Playlist;
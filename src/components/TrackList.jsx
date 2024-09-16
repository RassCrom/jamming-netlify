
import styles from '../css/TrackList.module.css'

import PropTypes from 'prop-types';

// PropTypes validation
TrackList.propTypes = {
    fetchedData: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    handleAddToPlaylist: PropTypes.func.isRequired,
};

function TrackList({ fetchedData, handleAddToPlaylist }) {

    return (
        <div className={styles.tracklist_container}>
            {fetchedData 
                ? fetchedData.map(item => (
                    <div className={styles.tracklist_items} key={item.id}>
                        <h1>Song: {item.name}</h1>
                        <h3>Artist: {item.artists['0'].name}</h3>
                        <p>Popularity: {item.popularity}</p>
                        <a className={styles.add_btn} onClick={() => {handleAddToPlaylist(item)}}>+</a>
                    </div>
                )) 
                : 'Waiting for search'}
        </div>
    )
}

export default TrackList;

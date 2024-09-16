

import TrackList from './TrackList';

import PropTypes from 'prop-types';

// PropTypes validation
TrackListContainer.propTypes = {
    fetchedData: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    addToPlaylist: PropTypes.func,
};

function TrackListContainer({ fetchedData, addToPlaylist }) {
    const handleAddToPlaylist = (item) => {
        addToPlaylist(item);
    }

    return (
        <>
            <TrackList fetchedData={fetchedData} handleAddToPlaylist={handleAddToPlaylist}/>
        </>
    )
}

export default TrackListContainer;

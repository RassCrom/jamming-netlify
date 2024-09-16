import { useEffect, useState } from "react";
import Playlist from "./PlayList";

import PropTypes from 'prop-types';

// PropTypes validation
PlayListContainer.propTypes = {
    playlistMusic: PropTypes.array,
    spotify: PropTypes.string,
    handleRemoveFromPlaylist: PropTypes.func,
    resetPlaylistMusic: PropTypes.func
};


function PlayListContainer({ playlistMusic, spotify, handleRemoveFromPlaylist, resetPlaylistMusic }) {
    const [spotifyUserId, setSpotifyUserId] = useState(null);
    const [spotifyPlaylistId, setSpotifyPlaylistId] = useState(null);
    const [playlistMusicUri, setPlaylistMusicUri] = useState([]);
    const [playlistNameInput, setPlaylistNameInput] = useState('');

    const handleInput = ({target}) => setPlaylistNameInput(target.value)

    useEffect(() => {
        const uris = playlistMusic.map(track => track.uri);
        setPlaylistMusicUri(uris);
    }, [playlistMusic])

    const resetSpotifyPlaylist = () => {
        setPlaylistMusicUri([]);
        resetPlaylistMusic();
        setSpotifyUserId(null);
        setSpotifyPlaylistId(null);
        setPlaylistNameInput('');
    }

    const handleSpotifyUserId = async () => {

        if (!spotify) {
            alert('No Spotify token provided');
            return;
        }

        try {
            const res = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${spotify}`
                }
            })
            const data = await res.json();
            setSpotifyUserId(data.id)
            return data.id
        } catch (err) {
            console.error(err)
        }
        // console.log(spotifyUserId)
    };

    const createPlaylist = async () => {
        console.log(playlistMusicUri)
        const userId = spotifyUserId || await handleSpotifyUserId();

        if (!userId) {
            console.error('No user available')
            return
        }
        const dataBody = {
            name: playlistNameInput || 'JAMMING LIST',
            description: "Added from Jamming",
            public: true
        };

        try {
            const res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${spotify}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataBody)
            });

            const data = await res.json();
            setSpotifyPlaylistId(data.id);
            // console.log(data)
            return data.id
        } catch(err) {
            console.error(err)
        }
    }

    const handleSubmitPlaylist = async () => {
        if (playlistMusic.length === 0) {
            alert("Add music to playlist");
            return
        }

        const playlistId = spotifyPlaylistId || await createPlaylist();

        if (!playlistId) {
            console.error('No id')
            return
        }
        
        const dataBody = {
            'uris': playlistMusicUri
        }

        try {
            const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${spotify}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataBody)
            });

            const data = await res.json();
            // console.log(data);
            resetSpotifyPlaylist();
            return data
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <Playlist 
            playlistMusic={playlistMusic} 
            handleSubmitPlaylist={handleSubmitPlaylist} 
            playlistNameInput={playlistNameInput} 
            handleInput={handleInput} 
            handleRemoveFromPlaylist={handleRemoveFromPlaylist} 
        />
    )
}

export default PlayListContainer;
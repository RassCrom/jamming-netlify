import { useEffect } from 'react';

import PropTypes from 'prop-types';

// PropTypes validation
FetchData.propTypes = {
    clientId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    handleToken: PropTypes.func.isRequired,
    handleSpotify: PropTypes.func.isRequired,
};

function FetchData({ handleToken, handleSpotify, clientId, token }) {
    const client_id = clientId;
    const redirect_uri = 'http://localhost:5173/';
    const scope = 'playlist-modify-public';

    useEffect(() => {  
        // Check if we have an access token in the URL hash
        const hash = window.location.hash;
        const tokenRaw = new URLSearchParams(hash.substring(1)).get('access_token');
        const expiresInNum = new URLSearchParams(hash.substring(1)).get('expires_in');
        if (hash && tokenRaw) {
            handleToken(tokenRaw)
            handleSpotify(tokenRaw)
            // console.log(token)

            if (expiresInNum && Number.isInteger(expiresInNum)) {
                setTimeout(() => {
                    handleToken(null);
                    window.history.pushState('Access Token', null, '/');
                }, expiresInNum * 1000)
            }
        } else {
            // Redirect to Spotify for authorization if no token is found
            let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=${scope}&redirect_uri=${redirect_uri}`;
            // alert(client_id)
            // console.log(client_id)
            
            if (client_id) {
                window.location.href = url
            }
        }
        // window.history.pushState('Access Token', null, '/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client_id, token]);

    return null;
}

export default FetchData;

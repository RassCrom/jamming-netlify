import { useState } from "react";
import SearchBar from './SearchBar';

import PropTypes from 'prop-types';
import FetchData from "./FetchData";

// PropTypes validation
SearchBarContainer.propTypes = {
    handleFetchedData: PropTypes.func.isRequired,
    handleSpotify: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
};

function SearchBarContainer({ handleFetchedData, handleSpotify, clientId }) {
    const [searchInput, setSearchInput] = useState('');
    const [token, setToken] = useState('');

    const handleChange = ({ target }) => setSearchInput(target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!searchInput) {
            alert('Please enter a search term.');
            return;
        }

        if (!token) {
            console.log(token)
            alert('Authorization token is missing. Please try again.');
            return;
        }

        try {
            const url = `https://api.spotify.com/v1/search?type=track&q=${searchInput}`;
            const response = await fetch(url, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const dataJson = await response.json();
            const arrayData = dataJson.tracks.items;
            handleFetchedData(arrayData)
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }

    }

    const handleToken = (target) => {
      setToken(target);
    //   handleSpotify(target);
    }

    console.log(!clientId, clientId)

    return (
        <>
            <SearchBar searchInput={searchInput} handleChange={handleChange} handleSubmit={handleSubmit}/>
            {clientId ? <FetchData token={token} handleToken={handleToken} handleSpotify={handleSpotify} clientId={clientId} /> : null}
        </>
    )
}

export default SearchBarContainer;
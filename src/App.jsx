import { useState } from "react";
import Header from './components/Header';

import SearchBarContainer from "./components/SearchBarContainer";
import TrackListContainer from "./components/TrackListContainer";
import PlayListContainer from "./components/PlaylistContainer";
import PopupClientId from "./components/PopupClientId";
// import FetchData from './components/FetchData';

import styles from './css/App.module.css';

function App() {
  const [fetchedData, setFetchedData] = useState('');
  const [playlistMusic, setPlaylistMusic] = useState([]);
  const [spotify, setSpotify] = useState('');
  const [clientId, setClientId] = useState('');

  const handleFetchedData = (data) => setFetchedData(data);
  const resetPlaylistMusic = () => setPlaylistMusic([]);
  const handleClientId = ({target}) => setClientId(target.value);
  const addToPlaylist = (music) => {
    setPlaylistMusic(prev => [
      ...prev,
      music
    ]);
  };

  const handleRemoveFromPlaylist = (music) => {
    setPlaylistMusic((prev) => prev.filter(el => el.id !== music.id));
  };

  const handleSpotify = (target) => setSpotify(target);

  const handleClientIdSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      {!clientId && <PopupClientId handleClientId={handleClientId} clientId={clientId} handleClientIdSubmit={handleClientIdSubmit} />}
      <Header />
      <SearchBarContainer  handleFetchedData={handleFetchedData} handleSpotify={handleSpotify} clientId={clientId} handleClientId={handleClientId} />
      <div className={styles.music_list}>
        <TrackListContainer fetchedData={fetchedData} addToPlaylist={addToPlaylist} />
        <PlayListContainer playlistMusic={playlistMusic} spotify={spotify} handleRemoveFromPlaylist={handleRemoveFromPlaylist} resetPlaylistMusic={resetPlaylistMusic} />
      </div>
    </>
  )
}

export default App;

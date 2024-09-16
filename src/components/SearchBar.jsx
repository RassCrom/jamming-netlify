
import PropTypes from 'prop-types';

import styles from '../css/SearchBar.module.css'

// PropTypes validation
SearchBar.propTypes = {
    searchInput: PropTypes.string.isRequired,  // searchTerm must be a string and is required
    handleChange: PropTypes.func.isRequired, // onInputChange must be a function and is required
    handleSubmit: PropTypes.func.isRequired       // onSearch must be a function and is required
};

function SearchBar({ searchInput, handleSubmit, handleChange }) {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className={styles.search_music} name="search-music" id="search-music" onChange={handleChange} placeholder="Type artist or music name" value={searchInput}/>
            <input type="submit" value="🩴" className={styles.search_btn}/>
        </form>
    )
}

export default SearchBar;
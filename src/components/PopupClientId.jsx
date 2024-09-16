import styles from '../css/PopupClientId.module.css';

import PropTypes from 'prop-types';

// PropTypes validation
PopupClientId.propTypes = {
    handleClientId: PropTypes.func.isRequired,
    handleClientIdSubmit: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
};

function PopupClientId({ handleClientId, clientId, handleClientIdSubmit }) {
    return (
        <form className={styles.form_clientId} onSubmit={handleClientIdSubmit}>
            <input 
                placeholder="Enter Spotify Client ID" 
                type="text" onChange={handleClientId} 
                value={clientId} 
                id='client-id' name="client-id"
            />
            <input type="submit" value='Submit'/>
        </form>
    )
}

export default PopupClientId;

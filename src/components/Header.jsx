import styles from '../css/Header.module.css';

function Header() {

    return (
        <header>
            <h1 href='#'>Jamming - <span className={styles.heading_white}>Connect to your Spotify</span></h1>
        </header>
    )
}

export default Header;

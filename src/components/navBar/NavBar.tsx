import SearchBar from "components/searchBar/SearchBar";
import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <div className={styles.navContainer}>
      <SearchBar />
    </div>
  );
}

export default NavBar;

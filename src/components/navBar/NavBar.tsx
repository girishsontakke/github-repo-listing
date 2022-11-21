import SearchBar from "components/searchBar/SearchBar";
import styles from "./NavBar.module.scss";

interface Iprops {
  user: string | null;
  setUser: (user: string) => void;
}

function NavBar(props: Iprops) {
  const { user, setUser } = props;
  return (
    <div className={styles.navContainer}>
      <SearchBar user={user} setUser={setUser} />
    </div>
  );
}

export default NavBar;

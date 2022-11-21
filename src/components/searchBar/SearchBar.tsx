import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

function SearchBar() {
  const [user, setUser] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?.length && user.length > 0) {
      window.location.href = user;
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        placeholder="Search with username"
        type="text"
        value={user ?? ""}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.searchButton}>
        search
      </button>
    </form>
  );
}

export default SearchBar;

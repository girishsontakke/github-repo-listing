import {
  LocationIcon,
  TwitterIcon,
  BlogIcon,
  CompanyIcon,
  PeopleIcon
} from "components/icons";
import { Iprofile } from "types";
import styles from "./Profile.module.scss";

interface Iprops {
  profile: Iprofile | null;
}
function Profile(props: Iprops) {
  const { profile } = props;

  return (
    <div className={styles.profileContainer}>
      {profile && (
        <>
          <img
            src={profile.avatar_url}
            className={styles.avatar}
            alt="user avatar"
          />
          <div>
            <div className={styles.name}>
              <h1>{profile.name}</h1>
              <h3>{profile.login}</h3>
            </div>
            <div className={styles.following}>
              <PeopleIcon />
              <span className={styles.count}>{profile.followers}</span>
              <span>followers</span>
              <span>·</span>
              <span className={styles.count}>{profile.following}</span>
              <span>following</span>
            </div>
            <div className={styles.profileLinkContainer}>
              {profile.company && (
                <div className={styles.profileLink}>
                  <CompanyIcon />
                  <span>{profile.company}</span>
                </div>
              )}
              {profile.location && (
                <div className={styles.profileLink}>
                  <LocationIcon />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.blog && (
                <div className={styles.profileLink}>
                  <BlogIcon />
                  <span>{profile.blog}</span>
                </div>
              )}
              {profile.twitter_username && (
                <div className={styles.profileLink}>
                  <TwitterIcon />
                  <span>{profile.twitter_username}</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;

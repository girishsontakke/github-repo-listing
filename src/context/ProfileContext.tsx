import React, { useCallback, useContext, useState } from "react";
import { Iprofile } from "types";
import LoadingContext from "./LoadingContext";

interface Icontext {
  profile: Iprofile | null;
  setProfile: React.Dispatch<React.SetStateAction<Iprofile | null>>;
  fetchProfile: (username: string) => void;
  profileError: string | null;
}
const ProfileContext = React.createContext<Icontext>({
  setProfile: () => {},
  profile: null,
  fetchProfile: () => {},
  profileError: null
});

export const ProfileContextProvider = ({
  children
}: React.PropsWithChildren) => {
  const [profile, setProfile] = useState<Iprofile | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const { setProfileLoading } = useContext(LoadingContext);

  const fetchProfile = useCallback(
    async (username: string) => {
      try {
        setProfileLoading(true);
        setProfileError(null);
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        setProfileLoading(false);
        const data = await response.json();
        if (response.status === 404) {
          setProfileError(data?.message);
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (error) {
        setProfileError("username does not exist");
        setProfile(null);
        setProfileLoading(false);
      }
    },
    [setProfileLoading]
  );

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, fetchProfile, profileError }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;

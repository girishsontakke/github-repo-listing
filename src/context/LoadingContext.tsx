import React, { Dispatch, useState } from "react";

interface Icontext {
  profileLoading: boolean;
  repositoriesLoading: boolean;
  setProfileLoading: Dispatch<React.SetStateAction<boolean>>;
  setRepositoriesLoading: Dispatch<React.SetStateAction<boolean>>;
}
const LoadingContext = React.createContext<Icontext>({
  profileLoading: false,
  repositoriesLoading: false,
  setProfileLoading: () => {},
  setRepositoriesLoading: () => {}
});

export function LoadingContextProvider({ children }: React.PropsWithChildren) {
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [repositoriesLoading, setRepositoriesLoading] =
    useState<boolean>(false);

  return (
    <LoadingContext.Provider
      value={{
        profileLoading,
        repositoriesLoading,
        setProfileLoading,
        setRepositoriesLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingContext;

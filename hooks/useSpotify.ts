import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { spotifyApi } from "../config/spotify";
import { ExtenededSession, TokenError } from "../types";

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    // if refresh token fail, redirect to login
    if (
      (session as ExtenededSession).error === TokenError.RefreshAccessTokenError
    ) {
      signIn();
    }

    spotifyApi.setAccessToken((session as ExtenededSession).accessToken);
  }, [session]);

  return spotifyApi;
};

export default useSpotify;

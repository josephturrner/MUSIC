"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Nav from './components/Nav';
import SpotifyTopItems from './components/SpotifyTopItems';

const Page = () => {

  // TODO:
  // I want to get the popularity of all the songs and all the artists
  // Give a humanized comment about how popular the music they listen to is using AI
  // For any overlap between song and artist, compare relative popularity of song vs artist
  // -- Could tell user if they are a "surface-level" fan of the artist
  // Use metadata to make AI "make fun of" the user

  const [safeToRenderSpotify, setSafeToRenderSpotify] = useState(false);
  const [accountMode, setAccountMode] = useState<string | null>(null);

  useEffect(() => {
    setAccountMode(localStorage.getItem('accountMode'));

    const checkAccountMode = () => {
      const account = localStorage.getItem("accountMode");
      setSafeToRenderSpotify(account == 'spotify');
      return account
    };

    const getSpotifyTopItems = () => {
      const storedTopItems = localStorage.getItem("spotifyTopItems");
    };

    const interval = setInterval(() => {
      if (checkAccountMode() == 'spotify') {
        getSpotifyTopItems();
      }
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <div>
      <Nav/>
      {localStorage.getItem('accountMode') == 'spotify' && safeToRenderSpotify && <SpotifyTopItems/>}
    </div>
  );
};

export default Page;

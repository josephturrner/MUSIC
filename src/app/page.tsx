"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Nav from './components/Nav';
import SpotifyTopItems from './components/SpotifyTopItems';

const Page = () => {

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

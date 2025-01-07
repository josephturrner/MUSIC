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
    // Function to check for the presence of spotifyTopItems in localStorage
    const checkSpotifyTopItems = () => {
      const storedTopItems = localStorage.getItem("spotifyTopItems");
      setSafeToRenderSpotify(!!storedTopItems);
    };

    checkSpotifyTopItems();

    // Set up an interval to check for changes in localStorage
    const interval = setInterval(() => {
      checkSpotifyTopItems(); 
    }, 100);

    // Clean up the interval when the component is unmounted
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

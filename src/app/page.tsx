"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Nav from './components/Nav';
import SpotifyTopItems from './components/SpotifyTopItems';

const Page = () => {

  const [safeToRenderSpotify, setSafeToRenderSpotify] = useState(false);
  const [accountMode, setAccountMode] = useState<string | null>('spotify');

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <Nav/>
      {safeToRenderSpotify && accountMode == 'spotify' && <SpotifyTopItems/>}
    </div>
  );
};

export default Page;

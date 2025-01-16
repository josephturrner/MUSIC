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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const baseUrl = 'http://localhost:3000';


  useEffect(() => {
    // Check local storage for an existing spotifyToken
    const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    window.history.replaceState(null, '', baseUrl);

    if (!(!!localStorage.getItem("spotifyAccessToken"))) {
      // Exchange the code for an access spotifyToken
      fetch('/api/spotify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, reqReason: 'auth' })
      })
        .then(res => res.json())
        .then(data => {
          if (data.spotifyAccessToken) {
            localStorage.setItem("spotifyAccessToken", data.spotifyAccessToken);
            setAccessToken(data.spotifyAccessToken);
          }
        })
        .catch(error => console.error("Failed to retrieve spotifyAccessToken:", error));
    } else {
      setAccessToken(localStorage.getItem("spotifyAccessToken"));
    }
  });

  useEffect(() => {
    if (accessToken) {
      fetch('/api/spotify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: accessToken, reqReason: 'fetchTop' })
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            localStorage.setItem("spotifyTopItems", JSON.stringify(data));
            setSafeToRenderSpotify(true);
          }
        })
        .catch(error => console.error("Failed to retrieve user top items:", error));
    }

  })

  return (
    <div>
      <Nav/>
      {safeToRenderSpotify && <SpotifyTopItems/>}
    </div>
  );
};

export default Page;

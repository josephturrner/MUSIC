import Image from "next/image";
import appInfo from '../../config/appInfo.json';
import { useEffect, useState } from "react";
import Chat from './Chat';

const Nav = () => {
  // const [spotifyToken, setSpotifyToken] = useState<string | null>(null);
  const baseUrl = 'http://localhost:3000';

  const setAccount = (mode) => {
    localStorage.setItem('accountMode', mode);
  }

  useEffect(() => {
    // Check local storage for an existing spotifyToken
    const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    window.history.replaceState(null, '', baseUrl);

    if (localStorage.getItem('accountMode') == 'spotify') {
      if (!localStorage.getItem("spotifyAccessToken")) {
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
              setAccount('spotify');
            }
          })
          .catch(error => console.error("Failed to retrieve spotifyAccessToken:", error));
      }
      else {
        if (!localStorage.getItem('spotifyTopItems')) {
          fetch('/api/spotify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken: localStorage.getItem('spotifyAccessToken'), reqReason: 'fetchTop' })
          })
            .then(res => res.json())
            .then(data => {
              if (data) {
                console.log(data);
                localStorage.setItem("spotifyTopItems", JSON.stringify(data));
              }
            })
            .catch(error => console.error("Failed to retrieve user top items:", error));
        }
      }
    }
  });

  const handleSpotifyButton = async () => {
    setAccount('spotify');
    if (!localStorage.getItem('spotifyAccessToken')) {
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
      const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
      const authorizeUrl = process.env.NEXT_PUBLIC_SPOTIFY_AUTHORIZE_URL;    
      const errorPage = `${baseUrl}/error`;
      const url = new URL(authorizeUrl || '');
      url.search = new URLSearchParams({
        client_id: clientId || '',
        response_type: 'code',
        redirect_uri: redirectUri || '',
        show_dialog: 'true',
        scope: 'user-read-private user-read-email user-read-playback-state user-top-read'
      }).toString();


      
      // Redirect to Spotify authorization URL
      window.location.href = url.toString();
    } else {
    }
  };

  const handleAppleMusicButton = async () => {
    setAccount('applemusic');
  }

  return (
    <nav className="flex w-full h-20 relative justify-center items-center bg-spotify-black text-off-white">
      {/* Logo on the left */}
      <div className="flex flex-row w-[25%] justify-start space-x-8 absolute left-0 pl-6">
        <Image 
          src={appInfo.logo}
          alt="" 
          width={500} 
          height={500}
          style={{ width: '4rem', height: '4rem' }}
          className="object-fill"
        />
      </div>

      {/* Title in the center */}
      <h1 className="text-5xl font-bold text-center mx-auto">
        {appInfo.name}
      </h1>

      {/* Buttons on the right */}
      <div className="absolute right-0 flex items-center justify-center space-x-6 pr-6">
        <button 
          onClick={handleSpotifyButton} 
          className="flex items-center justify-center rounded-full bg-spotify-green hover:bg-spotify-green-dark transition duration-500"
          style={{ height: '3.5rem', width: '3.5rem' }}
        >
          <Image 
            src="/images/spotify-logo.svg"
            alt=""
            width={500}
            height={500}
            style={{ height: '3rem', width: '3rem' }}
          />
        </button>
        <button
            onClick={handleAppleMusicButton}
            className="flex items-center justify-center rounded-lg bg-apple-pink hover:bg-apple-pink-dark transition duration-500"
            style={{ height: '3.5rem', width: '3.5rem' }}
          >
            <Image 
              src="/images/applemusic-logo.svg"
              alt=""
              width={500}
              height={500}
              style={{ height: '3rem', width: '3rem' }}
            />
          </button>
      </div>
    </nav>
  );    
};

export default Nav;
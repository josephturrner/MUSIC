import { useEffect, useState } from "react";
import Commentary from "./Commentary";

const SpotifyTopItems = () => {
  const [topSongs, setTopSongs] = useState<any[]>([]);
  const [topArtists, setTopArtists] = useState<any[]>([]);

  useEffect(() => {

    const storedTopItems = localStorage.getItem("spotifyTopItems");

    if (storedTopItems) {
      setTopArtists((JSON.parse(storedTopItems)).topArtists);
      setTopSongs((JSON.parse(storedTopItems)).topTracks);
    }
  }, []);


  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-left space-x-16 w-full bg-spotify-gray">
        {/* Top Songs List */}
        <div className="w-1/4">
          <ul className="space-y-1">
            {topSongs.map((song, index) => (
              <li key={index} className="px-2 mx-auto text-center text-off-white w-full h-32 flex flex-row items-center justify-start bg-spotify-gray rounded-lg transition duration-500 hover:shadow-[inset_0px_0px_100px_var(--spotify-glow)]">
                <img
                  src={song.album.images[0].url}
                  alt=""
                  className="w-24 h-24 object-cover rounded-md mx-2"/>
                <div className="text-off-white text-center flex flex-col mx-2 w-full">
                  <span className="text-sm">{song.name}</span>
                  <div className="italic text-xs">
                    {song.artists.map((artist: any, idx: number) => (
                      <span key={idx}>
                        {artist.name}
                        {idx < song.artists.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <span></span>
                </div>
                <button className="flex-shrink-0 rounded-full w-8 h-8 hover:bg-spotify-green" onClick={() => handleClick(song.external_urls.spotify)}>↑</button>
              </li>
            ))}
          </ul>
        </div>



      {/* Top Artists List */}
      <div className="w-1/4">
        <ul className="space-y-1">
          {topArtists.map((artist, index) => (
            <li key={index} className="px-2 mx-auto text-center text-off-white w-full h-32 flex flex-row items-center justify-start bg-spotify-gray rounded-lg transition duration-500 hover:shadow-[inset_0px_0px_100px_var(--spotify-glow)]">
              <img
                src={artist.images?.[0]?.url || "/placeholder-image.png"}
                alt={artist.name || "Artist Image"}
                className="w-24 h-24 object-cover rounded-md mx-2"
              />
              <div className="text-off-white text-center flex flex-col mx-2 w-full">
                <span className="text-lg">{artist.name || "Unknown Artist"}</span>
              </div>
              <button className="flex-shrink-0 rounded-full w-8 h-8 hover:bg-spotify-green" onClick={() => handleClick(artist.external_urls?.spotify || "#")}>↑</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center w-1/3">
        <Commentary/>
      </div>
    </div>
  );
};

export default SpotifyTopItems;
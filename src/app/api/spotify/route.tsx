// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { FetchSpotifyArtists, FetchSpotifyTracks, SpotifyAuth } from './helpers';

export async function POST(req: Request) {
  try {
    const { accessToken, code, reqReason } = await req.json();

    switch (reqReason) {
      case 'auth':
        // Handle the authorization logic
        if (!code) {
          console.error("No code received in request");
          return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
        }
        console.log('Authorization request received');
        return NextResponse.json({ spotifyAccessToken: await SpotifyAuth(code)});
        
      case 'fetchTop':
        // Handle the logic for fetching top data (e.g., top tracks or top artists)
        console.log('Fetching top data');
        const topItems = {
          topTracks: (await FetchSpotifyTracks(accessToken, 50, 'medium')).items,
          topArtists: (await FetchSpotifyArtists(accessToken, 50, 'medium')).items
        }

        return NextResponse.json(topItems);
        
      default:
        throw new Error('Invalid request reasoning: ' + reqReason);
    }

  } catch (error) {
    console.error("Error using Spotify API:", error);
    return NextResponse.json({ error: "An error occurred while processing your request", details: error.message }, { status: 500 });
  }
}
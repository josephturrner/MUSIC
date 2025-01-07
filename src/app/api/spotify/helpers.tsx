import { NextResponse } from 'next/server';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://localhost:3000';

async function FetchSpotifyTracks(accessToken, num, term) {
    try {
        // Define the base URL for Spotify's top items

        const targetUrl = `https://api.spotify.com/v1/me/top/tracks?${new URLSearchParams({
            limit: `${num}`,
            time_range: `${term}_term`
        })}`;

        console.log(targetUrl);

        // Fetch top tracks
        const topTracksResponse = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!topTracksResponse.ok) {
            throw new Error();
        }

        const topTracksData = await topTracksResponse.json();

        return topTracksData;

    } catch (error) {
        console.error('Error fetching user\'s top tracks');
        return { error: 'An error occurred while fetching Spotify data' };
    }
}

async function FetchSpotifyArtists(accessToken, num, term) {
    try {
        // Define the base URL for Spotify's top items
        const targetUrl = `https://api.spotify.com/v1/me/top/artists?${new URLSearchParams({
            limit: `${num}`,
            time_range: `${term}_term`
        })}`;

        console.log(targetUrl);

        // Fetch top artists
        const topArtistsResponse = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!topArtistsResponse.ok) {
            console.log(topArtistsResponse);
            throw new Error();
        }

        const topArtistsData = await topArtistsResponse.json();

        return topArtistsData;

    } catch (error) {
        console.error('Error fetching user\'s top artists');
        return { error: 'An error occurred while fetching Spotify data' };
    }
}

async function SpotifyAuth(code) {
    // Prepare request data for token exchange
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        }).toString(),
    });

    // Log the response status and body if it's not OK
    if (!tokenResponse.ok) {
        const errorBody = await tokenResponse.text();
        console.error("Error from Spotify API:", errorBody);
        return NextResponse.json({ error: "Failed to exchange code for token", details: errorBody }, { status: 500 });
    }

    // Parse the token response
    const tokenData = await tokenResponse.json();
    // console.log("Token data received:", tokenData);  // Log the access token or any details

    return tokenData.access_token;
}

export { FetchSpotifyArtists, FetchSpotifyTracks, SpotifyAuth };
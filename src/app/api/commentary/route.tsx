import { NextResponse } from 'next/server';


/* 
TODO:
- I want to provide a set context to a model for EVERY call
- Store static context provided by me
- Use sentiment analysis model / chatbot model and prompt to make fun of user

Ex:
const prompt = `
  Here's some data about your listening history:
  Popularity: [30, 10, 5, 3, 20, 5]
  Context: ["popularity ranges 0-100, where 0 is least popular and 100 is most popular", "people who listen to popular music have shallow taste", "people who listen to unpopular music have pretentious taste"]
  ${userContext}  // Add any relevant stored context here
  Please provide a humorous commentary.
`;

I would like to generate an abstract album cover to represent your listening
- could associate colors and shapes with genres
- use top song album covers & top artist photo

Some example context:
- popularity range, low is pretentious, high is shallow
- song & artist names
- genres, associate some genres with judgements
- if song overlaps with artist, compare popularity - if the song is more popular then you are a fake fan, otherwise you're a fanboy
- release dates of the top songs - old songs: you probably think you were born in the wrong generation, new songs: you don't know anything about music
*/


// src/app/api/commentary/route.tsx
export async function POST(request) {
    const data = await request.json();
  
    return NextResponse.json(
        { message: 'User Data Received' },
        { status: 200 }
    );
  }
  
// app/api/llm/route.tsx
import { HfInference } from "@huggingface/inference";

// Initialize Hugging Face inference with your API key
const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { musicData } = await req.json();

    // Construct the prompt based on user’s music data
    const prompt = `
      Based on a user's Spotify music preferences, generate a personality bio:
      - Genres: ${musicData.genres.join(", ")}
      - Average Energy: ${musicData.energy}
      - Average Valence: ${musicData.valence}
      - Top Artists: ${musicData.topArtists.join(", ")}

      Personality Bio:
    `;

    // Make the call to Hugging Face API for text generation
    const result = await inference.textGeneration({
      model: "gpt2", // Example model; adjust as needed
      inputs: prompt,
      parameters: { max_new_tokens: 60 }
    });

    // Return JSON response back to the frontend
    return new Response(JSON.stringify({ bio: result.generated_text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error with API call:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred with the API call" }),
      { status: 500 }
    );
  }
}
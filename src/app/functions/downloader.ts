"use server";

export async function downloadTikTok(url: string) {
  try {
    const apiUrl = process.env.TT_API_URL;

    if (!apiUrl) {
      throw new Error("TT_API_URL environment variable is not defined.");
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error downloading TikTok:', error);
    throw error;
  }
}

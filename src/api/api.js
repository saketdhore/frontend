export async function sendScorePrompt(prompt) {
  try {
    const res = await fetch('http://localhost:8000/api/v1/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    console.error('API error:', err);
    return null;
  }
} 
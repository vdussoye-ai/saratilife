/**
 * API client — all calls go through /api/ serverless functions
 * TODO (Task 7): Implement fetchCoaching, fetchBlueprint, saveAssessment
 */

export async function fetchCoaching(scores, context) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scores, context }),
  });
  if (!res.ok) throw new Error('Coaching request failed');
  return res.json();
}

export async function fetchBlueprint(scores) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'blueprint', scores }),
  });
  if (!res.ok) throw new Error('Blueprint request failed');
  return res.json();
}

export async function saveAssessment(answers, scores) {
  // Phase 1: localStorage only (see storage.js)
  // Phase 2: POST to Supabase
  const { setLocal } = await import('./storage.js');
  setLocal('assessment_answers', answers);
  setLocal('assessment_scores', scores);
}

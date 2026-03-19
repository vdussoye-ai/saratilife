/**
 * Scoring engine — calculates Five Capitals scores from assessment answers
 * TODO (Task 4/7): Implement full scoring algorithm
 *
 * @param {Object[]} answers - Array of { questionId, capitalType, value }
 * @returns {{ career: number, financial: number, health: number, social: number, inner: number }}
 */
export function calculateCapitalScores(answers) {
  const totals = { career: 0, financial: 0, health: 0, social: 0, inner: 0 };
  const counts = { career: 0, financial: 0, health: 0, social: 0, inner: 0 };

  for (const answer of answers) {
    const { capitalType, value } = answer;
    if (capitalType in totals) {
      totals[capitalType] += Number(value) || 0;
      counts[capitalType] += 1;
    }
  }

  const scores = {};
  for (const key of Object.keys(totals)) {
    scores[key] = counts[key] > 0
      ? Math.round((totals[key] / (counts[key] * 10)) * 100)
      : 0;
  }

  return scores;
}

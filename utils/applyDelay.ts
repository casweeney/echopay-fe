export async function applyMinDelay(delay = 4000) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

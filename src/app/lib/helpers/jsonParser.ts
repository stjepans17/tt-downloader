export function parseJsonSafely(jsonString: string) {
  try {
    const firstParse = JSON.parse(jsonString);

    if (typeof firstParse === 'string') {
      return JSON.parse(firstParse);
    }

    return firstParse;
  } catch (error) {
    console.error('Invalid JSON:', error);
    return null;
  }
}
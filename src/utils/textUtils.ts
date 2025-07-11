// src/utils/textUtils.ts

export function stripCitations(text: string) {
  if (!text) return '';
  return text.replace(/\[.*?\]/g, '');
}

// This function truncates text to a certain length without cutting off words.
export function smartTruncate(text: string, maxLength: number) {
  if (!text || text.length <= maxLength) return text;

  // Find the last space within the desired length
  let truncatedText = text.substring(0, maxLength);
  truncatedText = truncatedText.substring(0, Math.min(truncatedText.length, truncatedText.lastIndexOf(" ")));

  return truncatedText + "...";
}

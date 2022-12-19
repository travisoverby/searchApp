export const capitalize = (word: string): string => {
  const firstLetter = word.charAt(0).toUpperCase();
  const suffix = word.slice(1);

  return `${firstLetter}${suffix}`;
}


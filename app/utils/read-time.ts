const WORDS_PER_MINUTE = 250;

export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / WORDS_PER_MINUTE);

  return time === 1 ? `${time} minute` : `${time} minutes`;
}

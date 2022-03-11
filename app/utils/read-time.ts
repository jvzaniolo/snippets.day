const WORDS_PER_MINUTE = 250;

export default function readingTime(content: string): string {
  let words = content.trim().split(/\s+/).length;
  let time = Math.ceil(words / WORDS_PER_MINUTE);

  return time === 1 ? `${time} minute` : `${time} minutes`;
}

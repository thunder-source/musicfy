export const convertSecondsToVisualTime = (time: number) =>
  `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

export const isLink = (str: string) => {
  // Regex pattern to match common URL formats
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  // Test if the string matches the URL pattern
  return urlPattern.test(str);
};

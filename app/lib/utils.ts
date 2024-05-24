export const convertSecondsToVisualTime = (time: number) =>
  `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

export const isLink = (str: string) => {
  // Regex pattern to match common URL formats
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  // Test if the string matches the URL pattern
  return urlPattern.test(str);
};

export function beautifyNumber(
  number: number | string,
  locale = 'en-US',
  options = { maximumFractionDigits: 2 },
) {
  if (typeof number === 'string') {
    return Intl.NumberFormat(locale, options).format(parseFloat(number));
  } else if (typeof number === 'number') {
    return Intl.NumberFormat(locale, options).format(number);
  }
}

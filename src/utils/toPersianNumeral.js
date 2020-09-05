export const toPersianNumeral = (num) => {
  const persian = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
    ':': ':',
    '.': '/',
  };
  num = num.toString();
  let len = num.length;
  let converted = '';
  for (let i = 0; i < len; i++) {
    converted += persian[num[i]];
  }
  return converted;
};

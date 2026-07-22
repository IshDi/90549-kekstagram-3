function isStringLengthValid (text, maxLength) {
  return text.length <= maxLength;
}

console.log("Должен выводить true. Выводит: " + isStringLengthValid("Привет!", 10));
console.log("Должен выводить false. Выводит: " + isStringLengthValid("вфорвлыоврлфорвлфоырлворфл!", 10));
console.log("Должен выводить false. Выводит: " + isStringLengthValid("Как дела?", 0));
console.log("Должен выводить true. Выводит: " + isStringLengthValid("Как дела?", 20));


function isPalindrome (text) {
  const newText = text.replaceAll(' ', '').toLowerCase();
  let result = '';
  for (let i = newText.length - 1; i >= 0; i--) {
    result += newText[i];
  }
  return newText === result;
}

console.log("Должен выводить true. Выводит: " + isPalindrome("топот"));
console.log("Должен выводить true. Выводит: " + isPalindrome("ДовОд"));
console.log("Должен выводить false. Выводит: " + isPalindrome("Кекс"));
console.log("Должен выводить true. Выводит: " + isPalindrome("Лёша на полке клопа нашёл "));
console.log("Должен выводить true. Выводит: " + isPalindrome("a"));
console.log("Должен выводить true. Выводит: " + isPalindrome("фиф"));


function getNumber(str) {
  let result = '';
  let newStr = str.toString();
  for (let i = 0; i < newStr.length; i++) {
    let num = parseInt(newStr[i]);
    if (!isNaN(num)) {
      result += newStr[i];
    }
  }
  return result.length === 0 ? NaN : parseInt(result);
}

console.log("Должен выводить 2023. Выводит: " + getNumber('2023 год'));
console.log("Должен выводить 2022. Выводит: " + getNumber('ECMAScript 2022'));
console.log("Должен выводить 105. Выводит: " + getNumber('1 кефир, 0.5 батона'));
console.log("Должен выводить 7. Выводит: " + getNumber('агент 007'));
console.log("Должен выводить 100. Выводит: " + getNumber('агdjhjhjsjkj 00000 00000  100     kkdkdk'));
console.log("Должен выводить NaN. Выводит: " + getNumber('а я томат'));
console.log("Должен выводить 2023. Выводит: " + getNumber(2023));
console.log("Должен выводить 1. Выводит: " + getNumber(-1));
console.log("Должен выводить 15. Выводит: " + getNumber(1.5));

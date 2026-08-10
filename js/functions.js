const isStringLengthValid = (textInput, maxLength) => textInput.length <= maxLength;
isStringLengthValid('Привет!', 10);

const isPalindrome = (text) => {
  const normalizedText = text.replaceAll(' ', '').toLowerCase();
  let result = '';
  for (let i = normalizedText.length - 1; i >= 0; i--) {
    result += normalizedText[i];
  }
  return normalizedText === result;
};
isPalindrome('топот');

const getNumber = (value) => {
  let result = '';
  const stringValue = value.toString();
  for (let i = 0; i < stringValue.length; i++) {
    const num = parseInt(stringValue[i], 10);
    if (!Number.isNaN(num)) {
      result += stringValue[i];
    }
  }
  return parseInt(result, 10);
};
getNumber('ECMAScript 2022');

const getMinutes = (stringTime) => {
  const arrayTime = stringTime.split(':');
  return parseInt(arrayTime[0], 10) * 60 + parseInt(arrayTime[1], 10);
};

const isMeetingPossible = (workingStart, workingEnd, meetingStart, slotDuration) =>
  getMinutes(workingStart) <= getMinutes(meetingStart) && ((getMinutes(meetingStart) + slotDuration) <= getMinutes(workingEnd));

isMeetingPossible('08:00', '17:30', '14:00', 90);

import moment from "moment/moment.js";

export const formatTime = (timestamp, format = "MM/DD/YYYY HH:SS") => {
  return moment.unix(timestamp / 1000).format(format);
}

export const hoursToDays = (hours) => {
  if (hours < 0) {
    return 'Без срока'

  } else if (hours >= 8760) {
    return Math.floor((hours / 24) / 365) + ' ' + getNoun(Math.floor((hours / 24) / 365), 'года', 'года', 'лет')
  }

  return Math.floor(hours / 24) + ' ' + getNoun(Math.floor(hours / 24), 'день', 'дня', 'дней')
}

export const secondsToDays = (seconds) => {
  return hoursToDays(seconds / 3600)
}




function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}
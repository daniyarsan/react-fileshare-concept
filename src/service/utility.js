import moment from "moment/moment.js";
import {number} from "yup";

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'TB', 'PiB', 'EiB', 'ZiB', 'YiB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const formatTime = (timestamp, format = "MM/DD/YYYY HH:SS") => {
  return moment.unix(timestamp/1000).format(format);
}

export const baseUrl = () => {
  var url = window.location.href
  var arr = url.split("/");
  return arr[0] + "//" + arr[2]
}

export const hoursToDays = (hours) => {
  if (hours < 0) {
    return '∞'
  }
  else if (hours > 365) {
    return Math.floor((hours/24) / 365) + ' года'
  }
  return Math.floor(hours/24) + ' дней'
}

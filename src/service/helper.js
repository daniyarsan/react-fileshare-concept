import moment from "moment/moment.js";

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

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

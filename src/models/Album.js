import {convertSecondsToDaysHours, formatTime, getNoun} from "../service/TimeConverter.js";
import {baseUrl} from "../service/utility.js";
import {API_URL} from "../api/const.js";

export class Album {

  create_date
  name
  password
  shelf_time
  time_to_delete
  url
  view_count


  constructor(rawObj) {
    Object.assign(this, rawObj);
  }

  getStorageDays() {
    return this.shelf_time / 24
  }

  getStorageDaysWithNoun() {
    if (this.shelf_time === -1) {
      return 'Без срока'
    }
    return this.getStorageDays() + ' ' + getNoun(this.shelf_time, 'день', 'дня', 'дней')
  }

  getCreatedDate() {
    return formatTime(Date.parse(this.create_date))
  }

  getAlbumUrl() {
    return `${baseUrl()}/album/${this.url}`
  }

  getAlbumShowUrl() {
    return `${baseUrl()}/show/${this.url}/${this.password}`
  }
  getAlbumShowUrlWithAsterics() {
    return `${baseUrl()}/show/${this.url}/**********`
  }
  getAlbumEditUri() {
    return `/album/edit/${this.url}`
  }

  getFileDownloadUrl() {
    return `//${API_URL}/api/album/anon/download/${this.url}`
  }

  getTimeToDeleteInHours() {
    return convertSecondsToDaysHours(this.time_to_delete)
  }
}
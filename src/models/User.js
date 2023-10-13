export class User {
  DEFAULT_SHELF_DAYS = 30

  isAuthorized
  files_size
  username
  tariff
  files_cnt
  expiration_date

  constructor(rawObj) {
    Object.assign(this, rawObj);
  }

  getTariffShelfDays() {
    if (this.tariff || this?.tariff?.shelf_time != -1) {
      return this.DEFAULT_SHELF_DAYS
    }

    return this?.tariff.shelf_time / 24
  }

  getFilesize() {
    return this.files_size
  }

  hasTariff(option) {
    return this?.tariff ? this.tariff.option == option : false
  }
}

export class User {
  DEFAULT_SHELF_DAYS = 30

  files_size
  username
  tariff
  files_cnt
  expiration_date

  constructor(rawObj) {
    Object.assign(this, rawObj);
  }

  getTariffShelfDays() {
    if (!this.tariff) {
      return this.DEFAULT_SHELF_DAYS
    }

    return Math.floor(this?.tariff?.shelf_time / 24)
  }

  getFilesize() {
    return this.files_size
  }

  hasTariff(option) {
    return this?.tariff ? this.tariff.option == option : false
  }
}

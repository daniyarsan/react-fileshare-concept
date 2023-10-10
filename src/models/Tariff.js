export class Tariff
{
  description
  files
  option
  price
  shelf_time
  size
  title

  constructor(obj = null) {
    const defaultFields = {
      "description": "",
      "files": 0,
      "option": "",
      "price": 0,
      "shelf_time": 0,
      "size": 0,
      "title": ""
    }

    if (obj) {
      Object.keys(defaultFields).forEach(key => defaultFields[key] = obj[key]);
    }
    Object.assign(this, defaultFields);
  }



}
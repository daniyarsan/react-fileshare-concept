import React from 'react';
import SelectField from "../SelectField/SelectField.jsx";
import {hoursToDays} from "../../../service/TimeConverter.js";

function PeriodSelectField({limitDays, ...props}) {

  let optionValues = [1, 3, 7, 14, 30, 90, 180, 270, 365]

  if (limitDays > -1) {
    optionValues = optionValues.filter(item => item <= limitDays)
  }

  optionValues = optionValues.map(item => {
    return {value: item * 24, label: hoursToDays(item * 24)}
  })

  if (limitDays == -1) {
    optionValues.push({value: -1, label: 'Без срока'})
  }

  return <SelectField {...props} options={optionValues}/>
}

export default PeriodSelectField;
import React from 'react';
import SelectField from "../SelectField/SelectField.jsx";
import {hoursToDays} from "../../../service/TimeConverter.js";

function PeriodSelectField({limitDays, ...props}) {

  const optionValues = [1, 3, 7, 14, 30, 90]

  const options = optionValues.filter(item => item <= limitDays).map(item => {
    return {value: item * 24, label: hoursToDays(item * 24)}
  })

  return <SelectField {...props} options={options}/>
}

export default PeriodSelectField;
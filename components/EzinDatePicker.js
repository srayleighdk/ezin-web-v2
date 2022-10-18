import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
// import MaskedInput from 'antd-mask-input';
import InputMask from 'react-input-mask';

import moment from 'moment'
import { Input } from 'antd';
export default function EzinDatePicker(props) {
  const dateFormat = 'DD/MM/YYYY';
  const [startDate, setStartDate] = useState(null);
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (props && props.value) {
      setStartDate(new Date(moment(props.value, dateFormat).year(), moment(props.value, dateFormat).month(), moment(props.value, dateFormat).date()));
      setValue(moment(props.value, dateFormat).format(dateFormat));
    } else {
      setStartDate(new Date());
      setValue(moment().format(dateFormat));
    }
  }, [props]);

  const handleOnchange = (value) => {
    const date = moment(value, dateFormat);
    if (date.isValid()) {
      if (props.onChange) {
        props.onChange(props.id, date.format(dateFormat));
      }
    }
  }
  const handleOnBlur = event => {
    const date = moment(event.target.value, dateFormat);
    if (!date.isValid()) {
      alert('Ngày phải có định dạng: ngày/tháng/năm');
      setValue(null);
      setStartDate(null);
    } else if (date < props.minDate) {
      // alert(`Ngày hiệu lực phải bắt đầu từ ${moment(props.minDate).format('DD/MM/YYYY')}`);
      setValue(null);
      setStartDate(null);
    }
  };
  return (
    <>
      <DatePicker
        {...props}
        selected={startDate}
        type="text"
        dateFormat='dd/MM/yyyy'
        value={value}
        onChange={value => handleOnchange(value)}
        customInput={
          <InputMask
            mask="99/99/9999"
            placeholder="dd/mm/yyyy"
            maskChar=" "
            // value={value}
            // onChange={e => handleOnchange(e.target.value)}
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
          // <MaskedInput ref={value} mask="11/11/1111" placeholder='dd/mm/yyyy' inputMode="numeric"/>
        }
        onBlur={handleOnBlur}
      />
    </>

  );
}

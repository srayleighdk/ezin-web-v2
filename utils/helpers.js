import moment from 'moment';
var validator = require('validator');
const path = require('path');

export const formatNumber = (num) =>
num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'): '0';

export const normalizePhoneNumber = (phoneNumber) => {
  var number = phoneNumber;
  if (phoneNumber.charAt(0) === '0') {
    number = phoneNumber.substring(1);
  }
  return number;
};

export const numberInputCallback = (ev) =>
  ev.target.value.replace(/[^0-9.]+/g, '');

export const encodeImageURL = (imageUrl) => {
  const basename = path.basename(imageUrl);
  const dirname = path.dirname(imageUrl)
  return `${dirname}/${encodeURIComponent(basename)}`;
}
export const getImageUrl = (imageUrl = '') => {
  const urls = {
    development: 'http://localhost:5050',
    test: 'https://sandbox.ezin.vn',
    staging: 'https://sandbox.ezin.vn',
    production: 'https://api.ezin.vn',
  };
  let url = urls[process.env.NEXT_PUBLIC_APP_ENV];
  if (imageUrl) {
    url += '/' + encodeImageURL(imageUrl);
  }
  return url;
};

export const getThumbnail = (url,w,h) => {
  return url.replace('public', `public/${w}-${h}`);
}
export const requireRule = (filed) => ({
  required: true,
  message: filed ? `${filed} không được để trống` : 'Không được để trống',
});

export const formatDateTime = (date = '') => moment(date).format('DD/MM/YYYY');

export const getDistrictData = (data = [], cityCode) =>
  data
    .filter((item) => item.parent_code === cityCode)
    .sort((a, b) => a.name.localeCompare(b.name));

export const getWardtData = (data = [], districtCode) =>
  data
    .filter((item) => item.parent_code === districtCode)
    .sort((a, b) => a.name.localeCompare(b.name));

export const toLocaleDateString = (dateString = null) => {
  const event = new Date(dateString);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return event.toLocaleDateString('vi-VN', options);
};

export const formatVND = (value = 0) => {
  try {
    // const res = `${Number(value.toFixed(1)).toLocaleString('vi-VN')}đ`;
    const res = `${formatNumber(value)}đ`
    return res;
  } catch (ex) {

  }
  return value
}


export const genArray = (min, max) => {
  const arr = [];
  for (var i = min; i <= max; i++) arr.push(i);
  return arr;
};

export const genArrayStr = (min, max) => {
  const arr = [];
  for (var i = min; i <= max; i++) arr.push(i.toString().padStart(2,'0'));
  return arr;
};

export const validateLegalId = async (rule, value) => {
  if(!value) throw new Error('Vui lòng nhập số CMND/Hộ chiếu/CCCD');
  // var patternCMND = new RegExp("^\\d{9}$");
  // var patternCCCD = new RegExp("^\\d{12}$");
  // var patternPassport = new RegExp("^[a-zA-Z][0-9]{8}$");
  // var patternPassport2 = new RegExp("^[a-zA-Z]{2}[0-9]{7}$");
  // if(value && !value.match(patternCMND) && !value.match(patternCCCD) && !value.match(patternPassport) && !value.match(patternPassport2))  throw new Error('Vui lòng nhập đúng số CMND/Hộ chiếu/CCCD');
};
export const validateDOB = async (rule, value) => {
  const date = moment(value, 'DD/MM/YYYY')
  const age = moment().diff(date, 'years', true);
  
  if (age < 1 || age > 70) {
    throw new Error('Vui lòng nhập đúng ngày sinh (từ 1 - 70 tuổi)');
  }
};

export const validateLicenseNumber = async (rule, value) => {
  if(!value) throw new Error('Vui lòng nhập biển số xe');
  // var pattern = new RegExp("^[0-9]{2}[a-zA-Z0-9Đ]{1,3}-[0-9.-]{4,6}$");

  // if (value && !value.match(pattern)) {
  //   throw new Error('Vui lòng nhập đúng biển số xe')
  // }
};

export const normalizeTotalFee = (total_fee) => {
  return total_fee && total_fee.replace(/\n/g, '<br/>')
}

export const elipse = (str, len) => {
  if (str && str.length > len) {
    return str.substr(0, len) + '...';
  }
  return str;
}

export const specialCharacters = str => {
  if (str) {
    return str.trim()
    .replace(/[\s`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, ' ')
    .replace(/\_$/, '');
  }
  return str;
}

export const validEmail = email => {
  return validator.isEmail(email); //=> true
}

export const validPhone = phone => {
  return validator.isMobilePhone(phone); //=> true
}

export const fullSearch = (str, keyword) => {
  return str.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
}

export const formatPhone = (phone) => {
  return phone? phone.replace('+84', 0): '';
}
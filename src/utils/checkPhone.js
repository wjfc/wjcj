function checkPhone(phone) {
  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
    return false;
  } else {
    return true;
  }
}
export default checkPhone;

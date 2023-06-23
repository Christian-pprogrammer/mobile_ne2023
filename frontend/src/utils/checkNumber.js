const isNumber = (string) => {
  if (!isNaN(string)) {
    return true;
  } else {
    return false;
  }
}

export default isNumber;
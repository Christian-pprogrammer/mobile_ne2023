const getErrMsg = function (err) {
  if(err?.response?.data.message) {
    return err.response.data.message;
  }else if(err.request) {
    // return 'Network error';
    console.log(err);
  }else{
    return 'Unknown error'
  }
}

export default getErrMsg;
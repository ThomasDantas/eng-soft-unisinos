'use strict';

const getCurrentTime = () => {
  const data = new Date();
  return data.getTime();
};

export default {
  getCurrentTime,
};

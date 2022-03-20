'use strict';

let config = {};

module.exports.setConfig = function(_config) {
  config = _config;
};

function getSymbols(post) {
  return post.length;
}


// 總閱讀時間
function getFormatTime(minutes, suffix) {
  const fHours = Math.floor(minutes / 60);
  let fMinutes = Math.floor(minutes - (fHours * 60));
  if (fMinutes < 1) {
    fMinutes = 1; // 0 => 1
  }
  return fHours < 1
    ? fMinutes + ' ' + suffix // < 59 => 59 mins.
    : fHours + " 小時 " + ('00' + fMinutes).slice(-2) + " 分鐘"; // = 61 => 1 小時 01 分鐘
}

// 字數
module.exports.symbolsCount = function(post) {
  let symbolsResult = getSymbols(post).toLocaleString('en-US') + " 字";
  return symbolsResult;
};

// 閱讀時間
module.exports.symbolsTime = function(post, awl = config.awl, wpm = config.wpm, suffix = config.suffix) {
  const minutes = Math.round(getSymbols(post) / (awl * wpm));
  return getFormatTime(minutes, suffix);
};

function getSymbolsTotal(site) {
  let symbolsResultCount = 0;
  site.posts.forEach(post => {
    symbolsResultCount += getSymbols(post);
  });
  return symbolsResultCount;
}

module.exports.symbolsCountTotal = function(site) {
  const symbolsResultTotal = getSymbolsTotal(site).toLocaleString('en-US') + " 字";
  return symbolsResultTotal;
};

module.exports.symbolsTimeTotal = function(site, awl = config.awl, wpm = config.wpm, suffix = config.suffix) {
  const minutes = Math.round(getSymbolsTotal(site) / (awl * wpm));
  return getFormatTime(minutes, suffix);
};

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
    : ('00' + fHours).slice(-2) + " 小時 " + ('00' + fMinutes).slice(-2) + " 分鐘"; // = 61 => 01 小時 01 分鐘
}

// 文章字數
module.exports.symbolsCount = function(post) {
  let symbolsResult = getSymbols(post).toLocaleString('en-US') + " 字";
  // if (symbolsResult > 9999) {
  //   symbolsResult = Math.round(symbolsResult / 1000) + 'k'; // > 9999 => 11k
  // } else if (symbolsResult > 999) {
  //   symbolsResult = (Math.round(symbolsResult / 100) / 10) + 'k'; // > 999 => 1.1k
  // } // < 999 => 111
  return symbolsResult;
};

// 閱讀時間
module.exports.symbolsTime = function(post, awl, wpm = config.wpm, suffix = config.suffix) {
  const minutes = Math.round(getSymbols(post) / wpm);
  return getFormatTime(minutes, suffix);
};

function getSymbolsTotal(site) {
  let symbolsResultCount = 0;
  site.posts.forEach(post => {
    symbolsResultCount += getSymbols(post);
  });
  return symbolsResultCount;
}

// 網站總字數
module.exports.symbolsCountTotal = function(site) {
  const symbolsResultTotal = getSymbolsTotal(site).toLocaleString('en-US') + " 字";
  // return symbolsResultTotal < 1000000
  //   ? Math.round(symbolsResultTotal / 1000) + 'k' // < 999k => 111k
  //   : (Math.round(symbolsResultTotal / 100000) / 10) + 'm'; // > 999k => 1.1m
  return symbolsResultTotal;
};

module.exports.symbolsTimeTotal = function(site, awl, wpm = config.wpm, suffix = config.suffix) {
  const minutes = Math.round(getSymbolsTotal(site) / wpm);
  return getFormatTime(minutes, suffix);
};

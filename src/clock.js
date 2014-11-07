var hourToString = {
  7: 'sieben',
  8: 'acht',
  9: 'neun',
  19: 'sieben',
  20: 'acht',
  24: 'zwölf'
};
var minutesToString = {
  5: 'fünf',
  10: 'zehn',
  15: 'viertel'
};

function toWordclock(date) {
  var hour = date.getHours();
  var minutes = date.getMinutes();
  if (minutes < 5) {
    return [hourToString[hour], 'uhr'];
  }
  if (minutes < 20) {
    return [minutesToString[minutes - minutes % 5], 'nach', hourToString[hour]];
  }
  return _handleMinutesAboveTwenty(minutes).concat(['halb', hourToString[hour + 1]]);
}

function _handleMinutesAboveTwenty(minutes) {
  if (minutes < 25) {
    return [minutesToString[10], 'vor'];
  }
  if (minutes < 30) {
    return [minutesToString[5], 'vor'];
  }
  if (minutes < 35) {
    return [];
  }
  if (minutes < 40) {
    return [minutesToString[5], 'nach'];
  }
  return ['zehn', 'nach'];
}

module.exports = toWordclock;
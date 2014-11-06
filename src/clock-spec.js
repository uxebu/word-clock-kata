var assert = require('assert');

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




describe('word clock', function() {
  describe('should say oclock', function() {
    it('for 9:00', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 09:00')), '' + ['neun', 'uhr']);
    });
    it('for 19:00', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 19:00')), '' + ['sieben', 'uhr']);
    });
    it('for 19:01', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 19:01')), '' + ['sieben', 'uhr']);
    });
  });
  describe('should say past', function() {
    it('for 19:05', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 19:05')), '' + ['fünf', 'nach', 'sieben']);
    });
    it('for 19:06', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 19:06')), '' + ['fünf', 'nach', 'sieben']);
    });
    it('for 19:10', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 19:10')), '' + ['zehn', 'nach', 'sieben']);
    });
  });
  it('should say quarter past for 19:15', function() {
    assert.equal('' + toWordclock(new Date('2014-01-01 19:15')), '' + ['viertel', 'nach', 'sieben']);
  });
  describe('should say before the half hour', function() {
    it('for 19:20', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 19:20')), '' + ['zehn', 'vor', 'halb', 'acht']);
    });
    it('for 19:21', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 19:21')), '' + ['zehn', 'vor', 'halb', 'acht']);
    });
    it('for 19:22', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 19:22')), '' + ['zehn', 'vor', 'halb', 'acht']);
    });
    it('for 19:24', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 19:24')), '' + ['zehn', 'vor', 'halb', 'acht']);
    });
    it('for 23:20', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:20')), '' + ['zehn', 'vor', 'halb', 'zwölf']);
    });
    it('for 23:25', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:25')), '' + ['fünf', 'vor', 'halb', 'zwölf']);
    });
    it('for 23:26', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:26')), '' + ['fünf', 'vor', 'halb', 'zwölf']);
    });
    it('for 23:29', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:29')), '' + ['fünf', 'vor', 'halb', 'zwölf']);
    });
  });
  describe('should say half past', function() {
    it('for 23:30', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:30')), '' + ['halb', 'zwölf']);
    });
    it('for 23:34', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:34')), '' + ['halb', 'zwölf']);
    });
  });
  describe('should say after half past', function() {
    it('for 23:35', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:35')), '' + ['fünf', 'nach', 'halb', 'zwölf']);
    });
    it('for 23:39', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:39')), '' + ['fünf', 'nach', 'halb', 'zwölf']);
    });
    it('for 23:40', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:40')), '' + ['zehn', 'nach', 'halb', 'zwölf']);
    });
    it('for 23:44', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 23:44')), '' + ['zehn', 'nach', 'halb', 'zwölf']);
    });
  });
  describe('should say eight oclock', function() {
    it('for 20:00', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 20:00')), '' + ['acht', 'uhr']);
    });
    it('for 8:00', function() {
      assert.equal('' + toWordclock(new Date('2014-01-01 08:00')), '' + ['acht', 'uhr']);
    });
  });
});

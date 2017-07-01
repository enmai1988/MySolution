'use strict';

var displayAlert = function displayAlert(message, type) {
  document.querySelector('#alert_main').className = 'alert alert-main alert-' + type;
  document.querySelector('#alert_main').textContent = message;
  document.querySelector('#alert_main').style.top = '0';
  setTimeout(function () {
    document.querySelector('#alert_main').style.top = '-36px';
  }, 3000);
};

var computeAvgWaitTime = function computeAvgWaitTime(tickets) {
  if (!tickets.length) {
    return 0;
  }
  var sum = tickets.reduce(function (a, b) {
    console.log(new Date(b.claimedAt), ' //  ', new Date(b.createdAt));
    return a + Math.abs(new Date(b.claimedAt) - new Date(b.createdAt));
  }, 0);
  return Math.floor(sum / tickets.length / 3600 / 1000);
};

var connectionCount = function connectionCount(students, mentors, admins) {
  var res = {
    student: Object.keys(students).length,
    mentor: Object.keys(mentors).length,
    admin: Object.keys(admins).length
  };
  return res;
};

module.exports = {
  displayAlert: displayAlert,
  computeAvgWaitTime: computeAvgWaitTime,
  connectionCount: connectionCount
};

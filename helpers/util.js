const displayAlert = function(message, type) {
  document.querySelector('#alert_main').className = `alert alert-main alert-${type}`;
  document.querySelector('#alert_main').textContent = message;
  document.querySelector('#alert_main').style.top = '0';
  setTimeout(() => {
    document.querySelector('#alert_main').style.top = '-36px';
  }, 3000);
};

// const reducedToDay = date => date % 604800000 < 86400000;
//
// const computeAvgWaitTime = (tickets, mentors, userId) => {
//   const storage = [];
//   let length = tickets.length;
//   let count = 0;
//   let sum = tickets.reduce((acc, curr) => {
//     let date = Date.parse(curr.claimedAt);
//     let wait = date - Date.parse(curr.createdAt);
//     if (reducedToDay(date) && curr.claimedAt) {
//       storage.push(curr);
//       return acc + wait;
//     }
//     return acc;
//   }, 0);
//   let queuePos = tickets.filter((ticket) => { return ticket.status === 'Opened'; }).sort((ticket1, ticket2) => Date.parse(ticket1.createdAt) - Date.parse(ticket2.createdAt)).findIndex((ticket) => ticket.userId === userId ) + 1;
//   console.log('queuePos: ', queuePos);
//   console.log('list of open tickets: ', tickets.filter((ticket) => { return ticket.status === 'Opened'; }).sort((ticket1, ticket2) => Date.parse(ticket1.createdAt) - Date.parse(ticket2.createdAt)));
//   let quantityClaimedAndUnclosed = tickets.filter((ticket) => { return ticket.claimedAt && !ticket.closedAt; }).length;
//   let openTickets = tickets.filter((ticket) => { return ticket.status === 'Opened'; });
//   // keep this line for realtime data and delete line 21 with the hard code:
//   // let excessMentors = mentors - quantityClaimedAndUnclosed;
//   const excessMentors = 2;
//   const estimatedInterval = new Date(sum / storage.length).getUTCMinutes();
//   let estimate = 0;
//   let countAvail = excessMentors;
//   if (queuePos >= 0) {
//     for (let i = 0; i < queuePos; i++) {
//       if (i + 1 < countAvail && countAvail) {
//         console.log('in the first conditional', estimatedInterval / (excessMentors * excessMentors));
//         estimate += estimatedInterval / (excessMentors * excessMentors);
//       } else {
//         estimate += estimatedInterval / excessMentors/*optimized with all mentors on duty rather than excess*/;
//       }
//     }
//   }
//
//   return Math.floor(estimate);
// };

const computeAvgWaitTime = (tickets) => {
  if (!tickets.length) { return 0; }
  let sum = tickets.reduce((a, b) => {
    console.log(new Date(b.claimedAt), ' //  ', new Date(b.createdAt));
    return a + Math.abs((new Date(b.claimedAt) - new Date(b.createdAt)));
  }, 0);
  return Math.floor(sum / tickets.length / 3600 / 1000);
};

// const computeAvgTicketOpeningTime = (tickets) => {
//   if (tickets.length <= 1) { return 0; }
//   let diff = [];
//   for (let i = 0; i < tickets.length - 1; i++) {
//     diff.push(Date.parse(tickets[i + 1].createdAt) - Date.parse(tickets[i].createdAt));
//   }
//   return diff.reduce((a, b) => { return a + b; }) / diff.length;
// };
//
// const computeCurrWaitTime = (totalAveWait, gap, index) => {
//   if (!gap) { return 0; }
//   return Math.floor((totalAveWait - gap) * index / 3600 / 1000);
// };
//
//
// const getAdminStats = (tickets) => {
//   const result = {
//     open: 0,
//     closed: 0,
//     popularCategory: '',
//     popularCategoryCount: 0
//   };
//
//   const categoryStorage = {};
//
//   tickets.forEach(ticket => {
//     let category = ticket.category;
//     ticket.status === 'Closed' ? result.closed++ : result.open++;
//
//     categoryStorage[category] ? categoryStorage[category]++ : categoryStorage[category] = 1;
//
//     if (categoryStorage[category] > result.popularCategoryCount) {
//       result.popularCategoryCount = categoryStorage[category];
//       result.popularCategory = category;
//     }
//   });
//   console.log('getAdminStats: ', result);
//   return result;
// };

const connectionCount = (students, mentors, admins) => {
  let res = {
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

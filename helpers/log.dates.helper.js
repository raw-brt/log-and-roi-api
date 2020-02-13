// Helper function that calculates log durations
module.exports.updateLogDuration = (createdAt) => {
  
  const hoursFromStartingLog = Math.round((createdAt).setDate(formatDate.getDate()) / (1000 * 60 * 60 * 24));
  const actualDate = Math.round((new Date()).setDate(new Date().getDate()) / (1000 * 60 * 60 * 24));
  const ageInWeeks = Math.round((actualDate - daysFromLastPeriod) / 7);
  
  return ageInWeeks;
}
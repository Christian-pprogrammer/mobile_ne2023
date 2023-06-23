function calculateRemainingDays(purchaseDate, days) {
  const currentTimestamp = Date.now();

  // Get the timestamp to subtract
  const timestampToSubtract = purchaseDate;

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentTimestamp - timestampToSubtract.getTime();

  // Convert milliseconds to days
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return days - differenceInDays;
}

module.exports = calculateRemainingDays;
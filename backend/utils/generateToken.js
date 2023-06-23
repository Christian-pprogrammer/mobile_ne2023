function generateToken() {
  const timestamp = Date.now().toString(); // Get the current timestamp as a string
  const uniqueNumber = parseInt(timestamp.slice(-8)); // Extract the last 8 digits as an integer
  return uniqueNumber;
}

module.exports = generateToken;
const { jwtDecode } = require("jwt-decode");

module.exports.decodeToken = (token) => {
  const decodedToken = jwtDecode(token);
  const id = decodedToken.userId;
  return id;
};

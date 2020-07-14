export default (isDev) => {
  if (isDev) {
    return "http://localhost:4000/";
  } else {
    return "https://staffing-system-database.herokuapp.com/";
  }
};

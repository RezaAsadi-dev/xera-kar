const accessPage = (title, type) => {
  const token = localStorage.getItem("tokenSina");
  if (token) {
    const access = JSON.parse(localStorage.getItem("accessSina"));
    //(access)
    if (access === "full") {
      return;
    } else if (title && type) {
      return access.filter((item) => item.name === title)[0][type] ? false : true;
    } else {
      return access.filter((item) => item.name === title)[0]["view"] ? false : true;
    }
  }
};
export function truncateString(str, maxLength) {
  if (str?.length > maxLength) {
    return str?.slice(0, maxLength) + '...';
  }
  return str;
}

export default accessPage;


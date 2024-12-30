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

export default accessPage;

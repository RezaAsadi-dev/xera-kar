const validate = (data) => {
  const errors = {};

  // validate username
  if (!data?.username.trim() && !data?.username.length < 5) {
    errors.username = "Name is required";
  } else {
    delete errors.username;
  }
  // validate link
  if (!data?.link.trim()) {
    errors.link = "link is required";
  } else {
    delete errors.link;
  }

  // validate Description
  if (!data?.Description) {
    errors.Description = "Description is required";
  } else if (data?.Description.length < 6) {
    errors.Description = "Description need to be 6 character or more";
  } else {
    delete errors.Description;
  }
  return errors;
};
export default validate;

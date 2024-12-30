const validate = (data) => {
  const errors = {};

  // validate user
  if (!data.user.trim() && !data.user.length <5) {
    errors.user = "Name is required";
  } else {
    delete errors.user;
  }
  // validate Name
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else {
    delete errors.name;
  }
  // validate Password
  if (!data.phone) {
    errors.phone = "phone is required";
  } else if (data.phone.length !== 11) {
    errors.phone = "phone";
  } else {
    delete errors.phone;
  }

  return errors;
};
export default validate;

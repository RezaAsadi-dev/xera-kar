const validate = (data) => {
  const errors = {};

  // validate username
  if (!data.username.trim() && !data.username.length < 5) {
    errors.username = "Name is required";
  } else {
    delete errors.username;
  }
  // validate Name
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else {
    delete errors.name;
  }

  // validate Password
  if (!data.password) {
    errors.password = "password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password need to be 6 character or more";
  } else {
    delete errors.password;
  }
  // validate Password
  if (!data.phone) {
    errors.phone = "password is required";
  } else if (data.phone.length !== 11) {
    errors.phone = "Password need to be 6 character or more";
  } else {
    delete errors.phone;
  }
  // validate confrim password
  if (!data.confrimpassword) {
    errors.confrimpassword = " Confrim Password";
  } else if (data.confrimpassword !== data.password) {
    errors.confrimpassword = "Password do not match";
  } else {
    delete errors.confrimpassword;
  }
  return errors;
};
export default validate;

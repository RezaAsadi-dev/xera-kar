const validate = (data) => {
  const errors = {};

  // validate username
  if (!data.username?.trim() && !data.username?.length < 5) {
    errors.username = "Name is required";
  } else {
    delete errors.username;
  }
  // validate Name
  if (!data.name?.trim()) {
    errors.name = "Name is required";
  } else {
    delete errors.name;
  }
  // validate Email
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email address is invalid";
  } else {
    delete errors.email;
  }
  // validate Password
  if (!data.password) {
    errors.password = "password is required";
  } else if (data.password?.length < 6) {
    errors.password = "Password need to be 6 character or more";
  } else {
    delete errors.password;
  }
  // validate Password
  if (!data.phone) {
    errors.phone = "password is required";
  } else if (data.phone?.length !== 11) {
    errors.phone = "Password need to be 6 character or more";
  } else {
    delete errors.phone;
  }

  if (!data?.representativeTitle) {
    errors.representativeTitle = "representativeTitle is required";
  } else {
    delete errors.representativeTitle;
  }

  // validate confrim password
  if (!data.confrimPassword) {
    errors.confrimPassword = " Confrim Password";
  } else if (data.confrimPassword !== data.password) {
    errors.confrimPassword = "Password do not match";
  } else {
    delete errors.confrimPassword;
  }
  // validate data
  if (data.discodeCount?.trim() === "") {
    errors.discodeCount = "The discount code is empty";
  } else {
    delete errors.discodeCount;
  }
  if (data.commission?.trim() === "") {
    errors.commission = "The commision is empty";
  } else {
    delete errors.commission;
  }

  if (data.address?.trim() === "") {
    errors.address = "The address is empty";
  } else {
    delete errors.address;
  }

  return errors;
};
export default validate;

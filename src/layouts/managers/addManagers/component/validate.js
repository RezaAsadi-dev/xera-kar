const validate = (data) => {
  const errors = {};

  // Validate user
  if (!data.user.trim()) {
    errors.user = "UserName is required";
  } else if (data.user.length < 5) {
    errors.user = "user must be at least 5 characters";
  }

// Validate Phone
  if (!data.phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  } else if (data.phoneNumber.length !== 11) {
    errors.phoneNumber = "Phone number must be exactly 11 digits";
  }

  // Validate Email
  if (!data.email) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
  ) {
    errors.email = "Email is invalid";
  }

  // Validate Password
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be 6 characters or more";
  }

  
  // Validate Confirm Password
  if (!data.confirmpassword) {
    errors.confirmpassword = "Confirm password is required";
  } else if (data.confirmpassword !== data.password) {
    errors.confirmpassword = "Passwords do not match";
  }

  return errors;
};

export default validate;

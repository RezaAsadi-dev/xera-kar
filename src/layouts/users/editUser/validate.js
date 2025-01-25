const validate = (data) => {
  const errors = {};

  // validate username
  if (!data?.name?.trim() || data?.name?.length < 3) {
    errors.name = "Name is required and must be at least 3 characters long!";
  } else {
    delete errors.name;
  }

  // validate Email
  if (!data?.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email address is invalid!";
  } else {
    delete errors.email;
  }
  // Validate Phone
// if (!data?.phoneNumber) {
//   errors.phoneNumber = "Phone number is required!";
// } else if (data.phoneNumber.length < 11) {
//   errors.phoneNumber = "Phone number must be at least 11 digits!";
// } else {
//   delete errors.phoneNumber;
// }

// Validate Country
if (!data?.country || typeof data?.country !== "string" ) {
  errors.country = "Country is required!";
} else if (data.country.length < 3) {
  errors.country = "Country name must be at least 3 characters";
} else {
  delete errors.country;
}

  // Validate City
  if (!data?.city?.trim()) {
    errors.city = "City is required";
  } else if (data.city.length < 3) {
    errors.city = "City name must be at least 3 characters!";
  } else {
    delete errors.city;
  }

  // validate address
  if (!data?.address?.trim()) {
    errors.address = "The address is required!";
  } else {
    delete errors.address;
  }
  // console.log(errors);

  return errors;
};
export default validate;

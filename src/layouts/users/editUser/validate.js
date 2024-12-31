const validate = (data) => {
  const errors = {};

  // validate username
  if (!data.name?.trim() && !data.name?.length < 5) {
    errors.name = "Name is required";
  } else {
    delete errors.name;
  }

  // validate Email
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email address is invalid!";
  } else {
    delete errors.email;
  }
  // Validate Phone
  if (!data.phone) {
    errors.phone = "Phone number is required!";
  } else if (data.phone.length !== 11) {
    errors.phone = "Phone number must be exactly 11 digits!";
  }
    // Validate City
    if (!data.city?.trim()) {
      errors.city = "City is required";
    } else if (data.city.length < 2) {
      errors.city = "City name must be at least 3 characters!";
    } else {
      delete errors.city;
    }
  
    // Validate Country
    if (!data.country?.trim()) {
      errors.country = "Country is required!";
    } else if (data.country.length < 3) {
      errors.country = "Country name must be at least 3 characters";
    } else {
      delete errors.country;
    }
   // validate address
  if (!data?.address?.trim() ) {
    errors.address = "The address is required!";
  } else {
    delete errors.address;
  }
  console.log(errors)

  return errors;
};
export default validate;

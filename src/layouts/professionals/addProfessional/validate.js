const validate = (data) => {

  
  const errors = {};

  // validate name
  if (!data.name?.trim() && !data.name?.length < 5) {
    errors.name = "Name is required";
  } else {
    delete errors.name;
  } 
//Validate phoneNumber
// if (!data.phoneNumber) {
//   errors.phoneNumber = "Phone number is required";
// } else if (data.phoneNumber.length !== 11) {
//   errors.phoneNumber = "Phone number must be exactly 11 digits";
// } else {
//   delete errors.phoneNumber;
// }
  // validate Email
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email address is invalid";
  } else {
    delete errors.email;
  }

   // Validate gender
   if (!data.gender?.trim()) {
    errors.gender = "Gender is required";
  }

  if (data.address?.trim() === "") {
    errors.address = "The address is empty";
  } else {
    delete errors.address;
  }
   //Validate country
   if (!data.category?.trim()) {
    errors.country = "country is required";
  }
   //Validate city
   if (!data.category?.trim()) {
    errors.city = "city is required";
  }
   //Validate category
   if (!data.category?.trim()) {
    errors.category = "Category is required";
  }

  //Validate subcategory
  if (!data.subcategory?.trim()) {
    errors.subcategory = "Subcategory is required";
  }

  // Validate yearofExperience
  // if (data.yearofExperience?.trim()) {
  //   errors.yearofExperience = "Years of experience is required";
  // } else if (isNaN(data.yearofExperience) || data.yearofExperience < 0) {
  //   errors.yearofExperience = "Years of experience must be a positive number";
  // }

  // Validate img (optional)
  if (!data.img?.trim()) {
    errors.img = "Image is required";
  }

  return errors;
};
export default validate;

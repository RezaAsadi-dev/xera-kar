const validate = (data) => {
  const errors = {};

  // validate coName
  if (!data.coName?.trim() && !data.coName?.length < 20) {
    errors.coName = "Company Name is required";
  } else {
    delete errors.coName;
  }
  // validate phoneNumber
  if (!data.phoneNumber) {
    errors.phoneNumber = "Phone is required";
  } else if (data.phoneNumber?.length !== 11) {
    errors.phoneNumber = "Phone Number need to be 11 character!";
  } else {
    delete errors.phoneNumber;
  }
  // validate Email
  // if (!data.email) {
  //   errors.email = "Email is required";
  // } else if (!/\S+@\S+\.\S+/.test(data.email)) {
  //   errors.email = "Email address is invalid";
  // } else {
  //   delete errors.email;
  // }
  // Validate Country
  if (!data.country?.trim()) {
    errors.country = "Country is required";
  }

  // Validate Company Address
  if (!data.coAddress?.trim()) {
    errors.coAddress = "Company address is required";
  }

  // Validate Services/Products
  if (!data.services_products?.trim()) {
    errors.services_products = "Services/Products field is required";
  }

  // Validate Category
  if (!data.category?.trim()) {
    errors.category = "Category is required";
  }

  // Validate Subcategory
  if (!data.subcategory?.trim()) {
    errors.subcategory = "Subcategory is required";
  }

  // Validate Year of Experience
  if (!data.yearOfExperience) {
    errors.yearOfExperience = "Year of experience is required";
  } else if (isNaN(data.yearOfExperience) || data.yearOfExperience <= 0) {
    errors.yearOfExperience = "Year of experience must be a positive number";
  }

  // Validate Company Website
  // if (data.coWebsite?.trim() && !/^https?:\/\/[^\s]+$/.test(data.coWebsite)) {
  //   errors.coWebsite = "Company website is invalid";
  // }
   // Validate Description
  //  if (!data.description?.trim() && !data.coName?.length < 1500) {
  //   errors.description = "Description is required";
  // }
   // Validate Status
  //  if (!data.status?.trim()) {
  //   errors.status = "Status is required";
  // }
    // Validate Images
    // if (!Array.isArray(data.images) || data.images.length === 0) {
    //   errors.images = "At least one image is required";
    // }
  
    // Validate Video
    // if (!data.video?.url?.trim()) {
    //   errors.video = "Video URL is required";
    // } else if (!/^https?:\/\/[^\s]+$/.test(data.video.url)) {
    //   errors.video = "Video URL is invalid";
    // }

  return errors;
};
export default validate;

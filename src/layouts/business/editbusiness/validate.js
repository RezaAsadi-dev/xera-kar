const validate = (data) => {
  const errors = {};

  // validate name
  if (!data.name?.trim() && !data.name?.length < 20) {
    errors.name = "Company Name is required";
  } else {
    delete errors.name;
  }
  // validate phoneNumber
  if (!data.phoneNumber) {
    errors.phoneNumber = "phoneNumber is required";
  } else if (data.phoneNumber?.length !== 11) {
    errors.phoneNumber = "phoneNumber Number need to be 11 character!";
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
  if (!data.address?.trim()) {
    errors.address = "Company address is required";
  }

  // Validate Services/Products
  if (!data.services?.trim()) {
    errors.services = "Services/Products field is required";
  }

  // Validate Category
  if (!data.category?.trim()) {
    errors.category = "Category is required";
  }

  // Validate subcategory
  if (!data.subcategory?.trim()) {
    errors.subcategory = "subcategory is required";
  }

  // Validate Year of Experience
  if (!data.yearofExperience) {
    errors.yearofExperience = "Year of experience is required";
  } else if (isNaN(data.yearofExperience) || data.yearofExperience <= 0) {
    errors.yearofExperience = "Year of experience must be a positive number";
  }

  // Validate Company Website
  // if (data.companyWebsite?.trim() && !/^https?:\/\/[^\s]+$/.test(data.companyWebsite)) {
  //   errors.companyWebsite = "Company website is invalid";
  // }
   // Validate Description
  //  if (!data.about?.trim() && !data.name?.length < 1500) {
  //   errors.about = "about is required";
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

const validate = (data ,type,choosenProfile) => {
    const errors = {};
  
    // validate title
    if (!data.title.trim()) {
      errors.title ="Title is required";
    } else {
      delete errors.title;
    }
  
    // validate text
    if (!data.text.trim()) {
      errors.text = "Message text is required";
    } else {
      delete errors.text;
    }
  
    // validate type
    if (!data.type.trim()) {
      errors.type = "Message type is required";
    } else {
      delete errors.type;
    }
  
    // validate recievers
    if (data.choosenUserId==="" && type!=="general") {
      errors.recievers = "Recipients are required";
    } else {
      delete errors.recievers;
    }
  
    // validate date
    if (!data.time.from) {
      errors.date = "Date is required";
    } else {
      delete errors.date;
    }
  
    return errors;
  };
  
  export default validate;
  
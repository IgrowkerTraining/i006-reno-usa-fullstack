class Validator {

  /* =========================
     BASIC RULES
  ========================= */

  static required(value, fieldName) {
    
    if (value === null || value === undefined) {
      return `${fieldName} is required and cannot be null`;
    }

    if (typeof value !== "string") {
      return `${fieldName} must be a valid string`;
    }

    const trimmedValue = value.trim();

    if (trimmedValue === "" || trimmedValue.toLowerCase() === "null") {
      return `${fieldName} is required and cannot be empty or 'null'`;
    }

    return null;
  }

  static email(value) {
    if (typeof value !== "string") {
      return "Email must be a string";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return "Invalid email format";
    }

    return null;
  }

  static minLength(value, min) {
    if (typeof value !== "string") {
      return `Must be a string`;
    }

    if (value.length < min) {
      return `Must be at least ${min} characters long`;
    }

    return null;
  }

  static role(value) {
    if (value !== "user" && value !== "professional") {
      return "Invalid role. Must be exactly 'user' or 'professional'";
    }
    
    return null;
  }

  /* =========================
     AUTH VALIDATIONS
  ========================= */

  static validateRegistration(data = {}) {
    const errors = [];

    const nameError = this.required(data.name, "Name");
    if (nameError) {
      errors.push({ field: "name", message: nameError });
    }

    const emailError =
      this.required(data.email, "Email") || this.email(data.email);

    if (emailError) {
      errors.push({ field: "email", message: emailError });
    }

    const passwordError =
      this.required(data.password, "Password") ||
      this.minLength(data.password, 6);

    if (passwordError) {
      errors.push({ field: "password", message: passwordError });
    }

    if (data.role === "user") {
      const validTrades = ["electrician", "plumbing", "masonry"]; 

      if (typeof data.trade !== "string" || data.trade.trim() === "" || data.trade.trim().toLowerCase() === "null") {
        errors.push({ 
          field: "trade", 
          message: "trade is required for workers (users) and cannot be empty or 'null'" 
        });
      } else {
        const normalizedTrade = data.trade.trim().toLowerCase();
        
        if (!validTrades.includes(normalizedTrade)) {
          errors.push({ 
            field: "trade", 
            message: `Invalid trade. Must be one of: ${validTrades.join(', ')}` 
          });
        }
      }
    }

    return errors;
  }

  static validateLogin(data = {}) {
    const errors = [];

    const emailError =
      this.required(data.email, "Email") || this.email(data.email);

    if (emailError) {
      errors.push({ field: "email", message: emailError });
    }

    const passwordError = this.required(data.password, "Password");

    if (passwordError) {
      errors.push({ field: "password", message: passwordError });
    }

    return errors;
  }

/* =========================
     PROJECT VALIDATIONS
  ========================= */

  static validateProjectCreation(data = {}) {
    const errors = [];

    // 1. Validamos el name
    const nameError = this.required(data.name, "name");
    if (nameError) {
      errors.push({ field: "name", message: nameError });
    }

    // 2. Validamos la location
    const locationError = this.required(data.location, "location");
    if (locationError) {
      errors.push({ field: "location", message: locationError });
    }

    // 3. Validamos el userId
    const userIdError = this.required(data.userId, "userId");
    if (userIdError) {
      errors.push({ field: "userId", message: userIdError });
    }

    return errors;
  }

}

export default Validator;
export function isValidFullName(text: string) {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/

  if (!text) {
    return {
      status: false,
      message: 'Full name cannot be empty.',
    }
  } else if (!nameRegex.test(text)) {
    return {
      status: false,
      message: 'Please enter a valid full name.',
    }
  } else {
    return {
      status: true,
      message: 'Full name is valid.',
    }
  }
}

export function isValidPhoneNumber(text: string) {
  const phoneRegex = /^[0-9]{8,15}$/

  if (!text) {
    return {
      status: false,
      message: 'Phone number cannot be empty.',
    }
  } else if (!phoneRegex.test(text)) {
    return {
      status: false,
      message: 'Please enter a valid phone number.',
    }
  } else {
    return {
      status: true,
      message: 'Phone number is valid.',
    }
  }
}

export function isValidUserName(text: string) {
  // Check if the text meets the criteria for a valid user ID
  const alphanumericRegex = /^[a-zA-Z0-9]+$/
  const minLength = 4
  const maxLength = 50

  if (!text) {
    return {
      status: false,
      message: 'User ID cannot be empty.',
    }
  } else if (text.length < minLength || text.length > maxLength) {
    return {
      status: false,
      message: `User ID must be between ${minLength} and ${maxLength} characters long.`,
    }
  } else if (!alphanumericRegex.test(text)) {
    return {
      status: false,
      message: 'User ID can only contain alphanumeric characters.',
    }
  } else {
    return {
      status: true,
      message: 'User ID is valid.',
    }
  }
}

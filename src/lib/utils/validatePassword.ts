export function validatePassword(password: FormDataEntryValue | null) {
	// Check password length
	if (!password) {
		return 'Password not found!';
	}
	if (typeof password !== 'string') {
		return 'Password must be a string';
	}
	if (password.length !== 8) {
		return 'Password must be 8 characters long';
	}

	// Add more checks here, e.g.,
	// Check for at least one uppercase letter
	if (!/[A-Z]/.test(password)) {
		return 'Password must contain at least one uppercase letter';
	}

	// Check for at least one lowercase letter
	if (!/[a-z]/.test(password)) {
		return 'Password must contain at least one lowercase letter';
	}

	// Check for at least one number
	if (!/\d/.test(password)) {
		return 'Password must contain at least one number';
	}

	// Check for at least one special character
	if (!/[!@#$%^&*]/.test(password)) {
		return 'Password must contain at least one special character';
	}

	return true;
}

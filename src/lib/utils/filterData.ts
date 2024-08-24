export function filterObjects<T extends object, U extends Partial<T>>(data: T[], filter: U): T[] {
	return data.filter((obj: T) => {
		// Check if all filter conditions are met for the current object
		return Object.entries(filter).every(([key, value]) => {
			// If the filter value is an empty string, include objects with or without that property
			console.log('key', key, value);
			if (value === '' || value === null) {
				return true;
			}

			// Special case for 'salary' property
			if (key in obj && obj[key as keyof T] === null) {
				return true;
			}
			if (key === 'min_salary') {
				// If the filter value is an empty string, include all objects
				// console.log('value', key, value);
				if (value === '' || value === null) {
					console.log('value', key, value);
					return true;
				}

				// Include objects with salary greater than or equal to the filter value
				if (typeof value === 'number') {
					return (obj[key as keyof T] as number) >= value;
				} else {
					return (obj[key as keyof T] as number) >= parseFloat(value as string);
				}
			}

			// Check if the object has the property and its value matches the filter value
			return key in obj && obj[key as keyof T] === value;
		});
	});
}

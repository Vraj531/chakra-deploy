export function filterObjects<T extends object, U extends Partial<T>>(data: T[], filter: U): T[] {
	return data.filter((obj: T) => {
		// Check if all filter conditions are met for the current object
		return Object.entries(filter).every(([key, value]) => {
			// If the filter value is an empty string, include objects with or without that property
			console.log('key', key, value);
			if (value === '') {
				return true;
			}

			// Special case for 'salary' property
			if (key === 'min_salary') {
				// If the filter value is an empty string, include all objects
				if (value === '') {
					return true;
				}

				// Check if the object has the 'salary' property
				if (!(key in obj)) {
					console.log('lkey not', key);
					return false;
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

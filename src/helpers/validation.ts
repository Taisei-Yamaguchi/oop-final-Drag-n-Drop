export interface Validatable {
    value: string | number; // The value of the input
    required?: boolean; // If the input is required
    minLength?: number; // The minimum length of the input (for strings)
    maxLength?: number; // The maximum length of the input (for strings)
    min?: number; // The minimum value of the input (for numbers)
    max?: number; // The maximum value of the input (for numbers)
}

export function validate(input: Validatable): boolean {
    if (input.required && (input.value === undefined || input.value === null)) {
        return false;
    }

    if (typeof input.value === 'string') {
        if (input.minLength !== undefined && input.value.length < input.minLength) {
            return false;
        }

        if (input.maxLength !== undefined && input.value.length > input.maxLength) {
            return false;
        }
    }

    if (typeof input.value === 'number') {
        if (input.min !== undefined && input.value < input.min) {
            return false;
        }

        if (input.max !== undefined && input.value > input.max) {
            return false;
        }
    }

    return true;
}
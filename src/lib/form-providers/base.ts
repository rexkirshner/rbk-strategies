/**
 * Base Form Provider
 * Abstract base class for all form providers
 */

import type { FormProvider, FormSubmission, FormResponse } from '../../types/form';

/**
 * Validation helper
 */
export function validateFormData(data: FormSubmission): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }

  if (!data.email || !isValidEmail(data.email)) {
    return 'Valid email address is required';
  }

  if (!data.message || data.message.trim().length < 10) {
    return 'Message must be at least 10 characters';
  }

  return null;
}

/**
 * Email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Abstract base provider
 * Extend this class to create new providers
 */
export abstract class BaseFormProvider implements FormProvider {
  abstract submit(data: FormSubmission): Promise<FormResponse>;

  /**
   * Sanitize form data
   */
  protected sanitize(data: FormSubmission): FormSubmission {
    return {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim() || undefined,
      message: data.message.trim(),
    };
  }

  /**
   * Validate form data
   */
  protected validate(data: FormSubmission): string | null {
    return validateFormData(data);
  }
}

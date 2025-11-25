/**
 * Form Types
 * Type definitions for contact form and providers
 */

/**
 * Contact form submission data
 */
export interface FormSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
}

/**
 * Response from form submission
 */
export interface FormResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Form provider interface
 * All form providers must implement this interface
 */
export interface FormProvider {
  /**
   * Submit form data to the provider
   * @param data Form submission data
   * @returns Promise resolving to form response
   */
  submit(data: FormSubmission): Promise<FormResponse>;
}

/**
 * Form validation error
 */
export interface FormValidationError {
  field: keyof FormSubmission;
  message: string;
}

/**
 * Client-side form state
 */
export type FormState = 'idle' | 'submitting' | 'success' | 'error';

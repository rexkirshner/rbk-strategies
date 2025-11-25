/**
 * Form Provider Exports
 *
 * This file exports the active form provider.
 * To switch providers, simply change the import and export below.
 *
 * Available providers:
 * - CloudflareFormProvider (current)
 * - FormspreeProvider (add implementation)
 * - SendGridProvider (add implementation)
 * - ResendProvider (add implementation)
 */

export { CloudflareFormProvider } from './cloudflare';
export { BaseFormProvider, validateFormData } from './base';

// Export the active provider
// To switch providers, change this line:
export { CloudflareFormProvider as FormProvider } from './cloudflare';

// Example: To use Formspree instead
// export { FormspreeProvider as FormProvider } from './formspree';

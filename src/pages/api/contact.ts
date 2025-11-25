/**
 * Contact Form API Endpoint
 *
 * Handles POST requests from the contact form.
 * Uses the configured form provider (see src/lib/form-providers/index.ts)
 *
 * Endpoint: POST /api/contact
 *
 * Request body:
 * {
 *   name: string,
 *   email: string,
 *   company?: string,
 *   message: string
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   message: string,
 *   error?: string
 * }
 */

import type { APIRoute } from 'astro';
import { FormProvider } from '../../lib/form-providers';
import type { FormSubmission } from '../../types/form';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data = (await request.json()) as FormSubmission;

    // Create provider instance
    const provider = new FormProvider();

    // Submit via provider
    const response = await provider.submit(data);

    // Return response
    return new Response(JSON.stringify(response), {
      status: response.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('[Contact API] Error processing request:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message:
          'An error occurred processing your request. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

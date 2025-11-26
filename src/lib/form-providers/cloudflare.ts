/**
 * Cloudflare Form Provider
 *
 * Handles form submissions using Cloudflare Workers/Pages Functions.
 *
 * Implementation Options:
 * 1. Email via Resend API (recommended for production)
 * 2. Email via SendGrid API
 * 3. Store in Cloudflare D1/KV (requires additional setup)
 * 4. Email via MailChannels (requires DKIM configuration)
 *
 * Current Implementation: Console logging (development mode)
 *
 * To enable email sending:
 * 1. Choose an email provider (Resend recommended)
 * 2. Add API key to environment variables
 * 3. Uncomment and configure email sending code below
 * 4. See docs/reference/form-providers.md for detailed setup
 */

import { BaseFormProvider } from './base';
import type { FormSubmission, FormResponse } from '../../types/form';

export class CloudflareFormProvider extends BaseFormProvider {
  /**
   * Submit form to Cloudflare endpoint
   */
  async submit(data: FormSubmission): Promise<FormResponse> {
    // Sanitize and validate
    const sanitized = this.sanitize(data);
    const error = this.validate(sanitized);

    if (error) {
      return {
        success: false,
        message: error,
        error,
      };
    }

    try {
      // ========================================
      // PRODUCTION MODE - Resend email sending
      // ========================================
      const resendApiKey = import.meta.env.RESEND_API_KEY;

      if (!resendApiKey) {
        throw new Error('RESEND_API_KEY not configured');
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'RBK Strategies Contact Form <inbound@contact.rbkstrategies.com>',
          to: 'contact@rbkstrategies.com',
          subject: `New Contact Form Submission from ${sanitized.name}`,
          html: this.formatEmailHtml(sanitized),
          replyTo: sanitized.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Email sending failed');
      }

      // Log success to console for debugging
      console.log('[Cloudflare Form Provider] Email sent successfully to contact@rbkstrategies.com');

      // ========================================
      // Success response
      // ========================================
      return {
        success: true,
        message:
          'Thank you for your message! We\'ll get back to you within 24 hours.',
      };
    } catch (error) {
      console.error('[Cloudflare Form Provider] Submission error:', error);

      return {
        success: false,
        message:
          'Sorry, there was an error submitting your message. Please try again or email us directly at contact@rbkstrategies.com.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Format submission data as HTML email
   * @private
   */
  private formatEmailHtml(data: FormSubmission): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: system-ui, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1E3A5F; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #1E3A5F; }
            .value { margin-top: 5px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">RBK Strategies Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${this.escapeHtml(data.name)}</div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${this.escapeHtml(data.email)}</div>
              </div>

              ${
                data.company
                  ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${this.escapeHtml(data.company)}</div>
              </div>
              `
                  : ''
              }

              <div class="field">
                <div class="label">Message:</div>
                <div class="value" style="white-space: pre-wrap;">${this.escapeHtml(data.message)}</div>
              </div>

              <div class="footer">
                Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Escape HTML to prevent XSS
   * @private
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  }
}

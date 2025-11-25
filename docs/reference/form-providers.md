# Form Provider Architecture

**Project**: RBK Strategies Website
**Last Updated**: 2025-11-25
**Version**: 1.0

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Current Implementation](#current-implementation)
4. [Switching Providers](#switching-providers)
5. [Adding New Providers](#adding-new-providers)
6. [Production Setup](#production-setup)
7. [Testing Guide](#testing-guide)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The contact form uses a **provider abstraction layer** that makes it easy to switch between different form handling services (Resend, SendGrid, Formspree, etc.) without changing the form component.

### Key Benefits

- ✅ **Modular**: Swap providers by changing one import
- ✅ **Type-safe**: TypeScript interfaces ensure consistency
- ✅ **Testable**: Easy to mock providers for testing
- ✅ **Maintainable**: Provider logic isolated from UI

---

## Architecture

### File Structure

```
src/
├── types/
│   └── form.ts                    # Type definitions
├── lib/
│   └── form-providers/
│       ├── base.ts                # Base provider with validation
│       ├── cloudflare.ts          # Cloudflare implementation (current)
│       ├── index.ts               # Provider exports (swap here!)
│       └── [future providers]     # formspree.ts, resend.ts, etc.
├── components/
│   └── ContactForm.astro          # Form UI component
└── pages/
    └── api/
        └── contact.ts             # API endpoint
```

### Data Flow

```
User fills form
    ↓
ContactForm.astro validates client-side
    ↓
POST /api/contact
    ↓
API endpoint (contact.ts)
    ↓
FormProvider.submit(data)
    ↓
Provider implementation (cloudflare.ts, etc.)
    ↓
Email sent / Data stored
    ↓
Response returned to user
```

### Type System

```typescript
// Form submission data
interface FormSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// Provider response
interface FormResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Provider interface (all providers must implement)
interface FormProvider {
  submit(data: FormSubmission): Promise<FormResponse>;
}
```

---

## Current Implementation

### CloudflareFormProvider

**Status**: Development Mode (console logging only)

**Location**: `src/lib/form-providers/cloudflare.ts`

**Current Behavior**:
- Validates form data
- Logs to console
- Returns success response
- No emails sent (safe for development)

**Features**:
- Server-side validation (duplicate of client-side)
- HTML email template (ready for production)
- XSS protection via HTML escaping
- Error handling with user-friendly messages

---

## Switching Providers

### Option 1: Change Active Provider

Edit `src/lib/form-providers/index.ts`:

```typescript
// Current (Cloudflare)
export { CloudflareFormProvider as FormProvider } from './cloudflare';

// Switch to Formspree
export { FormspreeProvider as FormProvider } from './formspree';

// Switch to Resend
export { ResendProvider as FormProvider } from './resend';
```

**That's it!** The API endpoint and form component automatically use the new provider.

### Option 2: Environment-Based Selection

```typescript
// index.ts
const provider = import.meta.env.FORM_PROVIDER || 'cloudflare';

switch (provider) {
  case 'formspree':
    export { FormspreeProvider as FormProvider } from './formspree';
    break;
  case 'resend':
    export { ResendProvider as FormProvider } from './resend';
    break;
  default:
    export { CloudflareFormProvider as FormProvider } from './cloudflare';
}
```

---

## Adding New Providers

### Step 1: Create Provider File

Example: `src/lib/form-providers/resend.ts`

```typescript
import { BaseFormProvider } from './base';
import type { FormSubmission, FormResponse } from '../../types/form';

export class ResendFormProvider extends BaseFormProvider {
  async submit(data: FormSubmission): Promise<FormResponse> {
    // Sanitize and validate
    const sanitized = this.sanitize(data);
    const error = this.validate(sanitized);

    if (error) {
      return { success: false, message: error, error };
    }

    try {
      // Call Resend API
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'contact@rbkstrategies.com',
          to: 'contact@rbkstrategies.com',
          subject: `New Contact: ${sanitized.name}`,
          html: this.formatEmail(sanitized),
          replyTo: sanitized.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Email sending failed');
      }

      return {
        success: true,
        message: 'Thank you! We\'ll respond within 24 hours.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error sending message. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private formatEmail(data: FormSubmission): string {
    // Format email HTML (use CloudflareFormProvider.formatEmailHtml as template)
    return `<html>...</html>`;
  }
}
```

### Step 2: Export from Index

```typescript
// src/lib/form-providers/index.ts
export { ResendProvider } from './resend';
export { ResendProvider as FormProvider } from './resend';
```

### Step 3: Test

Run through the [Testing Guide](#testing-guide) below.

---

## Production Setup

### Enable Email Sending (Cloudflare Provider)

#### Option A: Resend (Recommended)

1. **Sign up**: https://resend.com (free tier: 100 emails/day)
2. **Get API key**: Dashboard → API Keys
3. **Verify domain**: Dashboard → Domains (or use onboarding@resend.dev)
4. **Add to environment**:

```bash
# .env (local)
RESEND_API_KEY=re_your_api_key_here

# Cloudflare Pages (production)
Dashboard → Settings → Environment Variables
RESEND_API_KEY = re_your_api_key_here
```

5. **Edit `src/lib/form-providers/cloudflare.ts`**:

Uncomment the "PRODUCTION MODE" section (lines ~46-68):

```typescript
// Uncomment this block:
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
    from: 'RBK Strategies <noreply@yourdomain.com>', // Update!
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
```

6. **Test in production**:
   - Deploy to Cloudflare Pages
   - Submit test form
   - Check inbox for email
   - Check Cloudflare Pages logs for errors

#### Option B: SendGrid

1. **Sign up**: https://sendgrid.com
2. **Get API key**: Settings → API Keys
3. **Verify sender**: Settings → Sender Authentication
4. **Add to environment**:

```bash
SENDGRID_API_KEY=SG.your_api_key_here
```

5. **Create SendGrid provider** (see [Adding New Providers](#adding-new-providers))

#### Option C: MailChannels (Cloudflare-specific)

1. **Setup DKIM**: Requires domain DNS configuration
2. **Documentation**: https://support.mailchannels.com/hc/en-us
3. **Note**: More complex setup, but "free" on Cloudflare Workers

---

## Testing Guide

### Manual Testing Checklist

#### 1. Client-Side Validation

Visit http://localhost:4321/#contact-form-section

**Test: Empty form**
- [ ] Click "Send Message" without filling anything
- [ ] All required fields show error messages
- [ ] Focus should go to first error field

**Test: Invalid email**
- [ ] Enter name: "Test"
- [ ] Enter email: "notanemail"
- [ ] Leave message empty
- [ ] Click "Send Message"
- [ ] Email should show "Please enter a valid email address"

**Test: Short message**
- [ ] Enter name: "Test"
- [ ] Enter valid email
- [ ] Enter message: "Hi" (less than 10 characters)
- [ ] Should show "Message must be at least 10 characters"

**Test: Error clearing**
- [ ] Fill form with errors
- [ ] Click submit (see errors)
- [ ] Start typing in name field
- [ ] Name error should disappear

#### 2. Form Submission (Development Mode)

**Test: Successful submission**
- [ ] Fill all required fields correctly
- [ ] Add optional company field
- [ ] Click "Send Message"
- [ ] Button should show spinner and "Sending..."
- [ ] Button should be disabled during submission
- [ ] Success message should appear (green box)
- [ ] Form should reset (all fields cleared)
- [ ] Check browser console for log entry

**Expected console output**:
```
[Cloudflare Form Provider] Form submission received: {
  name: "...",
  email: "...",
  company: "...",
  message: "...",
  timestamp: "2025-11-25T..."
}
```

#### 3. API Endpoint Testing

**Test: Direct API call**

```bash
# Terminal test
curl -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from curl"
  }'
```

**Expected response**:
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you within 24 hours."
}
```

**Test: Missing fields**

```bash
curl -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'
```

**Expected response** (400 status):
```json
{
  "success": false,
  "message": "Valid email address is required",
  "error": "Valid email address is required"
}
```

#### 4. Responsive Testing

- [ ] Test form on mobile (< 768px)
- [ ] Test form on tablet (768px - 1024px)
- [ ] Test form on desktop (> 1024px)
- [ ] All form fields should be readable
- [ ] Submit button should be easy to tap on mobile

#### 5. Accessibility Testing

- [ ] Tab through form (keyboard only)
- [ ] Tab order should be logical (name → email → company → message → submit)
- [ ] Error messages should be announced by screen readers
- [ ] Form labels should be associated with inputs
- [ ] Required fields marked with *

#### 6. Production Testing (After Email Setup)

- [ ] Deploy to Cloudflare Pages
- [ ] Fill out form
- [ ] Check email inbox
- [ ] Reply-to should be submitter's email
- [ ] Email should be formatted correctly (HTML)

---

## Troubleshooting

### Issue: Form submission hangs (infinite spinner)

**Symptoms**: Button shows "Sending..." forever

**Causes**:
- API endpoint not reachable
- JavaScript error in form handler
- Network error

**Debug**:
1. Open browser console (F12)
2. Look for JavaScript errors
3. Check Network tab for `/api/contact` request
4. Check response status and body

**Fix**:
- Ensure dev server running (`npm run dev`)
- Check `/api/contact` endpoint exists
- Verify TypeScript compiles without errors

---

### Issue: Validation errors not showing

**Symptoms**: Can submit invalid form, no error messages

**Causes**:
- JavaScript not loading
- Form ID mismatch
- Validation logic error

**Debug**:
1. Check browser console for errors
2. Verify `<script>` tag in ContactForm.astro is included
3. Check element IDs match (`#contact-form`, `#name-error`, etc.)

**Fix**:
- Ensure Astro is including client-side scripts
- Verify no conflicting CSS hiding errors
- Check `form-error` class has `min-height` so space is reserved

---

### Issue: Email not sending (production)

**Symptoms**: Form submits successfully but no email received

**Causes**:
- API key not configured
- "From" email not verified
- API key missing permissions
- Email in spam folder

**Debug**:
1. Check Cloudflare Pages logs:
   - Dashboard → Pages → [your-site] → View deployment → Functions
2. Look for errors in logs
3. Verify environment variable is set
4. Check email provider dashboard for error logs

**Fix (Resend)**:
- Verify domain ownership
- Check API key has send permission
- Try using `onboarding@resend.dev` for testing
- Check spam folder
- Check Resend dashboard for failed emails

---

### Issue: "RESEND_API_KEY not configured" error

**Symptoms**: Error in logs or browser console

**Causes**:
- Environment variable not set
- Wrong environment variable name
- Build didn't pick up environment changes

**Fix**:
1. **Local**: Create `.env` file with `RESEND_API_KEY=re_...`
2. **Production**:
   - Cloudflare Pages → Settings → Environment Variables
   - Add `RESEND_API_KEY` = `re_your_key`
   - Redeploy site
3. Restart dev server if testing locally

---

## Provider-Specific Documentation

### Formspree

**Pros**:
- Very simple setup
- Free tier: 50 submissions/month
- No code required

**Cons**:
- Less control
- External dependency
- Limited customization

**Implementation**:
```typescript
// formspree.ts
export class FormspreeProvider extends BaseFormProvider {
  async submit(data: FormSubmission): Promise<FormResponse> {
    const sanitized = this.sanitize(data);
    const error = this.validate(sanitized);

    if (error) return { success: false, message: error, error };

    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitized),
    });

    if (response.ok) {
      return { success: true, message: 'Thank you!' };
    } else {
      return { success: false, message: 'Error sending message.' };
    }
  }
}
```

### Resend

**Pros**:
- Modern API
- Good free tier (100 emails/day)
- Excellent documentation
- Built for developers

**Cons**:
- Requires API key management
- Domain verification for production use

**Setup**: See [Production Setup](#production-setup) → Option A

### SendGrid

**Pros**:
- Robust platform
- Free tier: 100 emails/day
- Advanced features (templates, analytics)

**Cons**:
- More complex API
- Requires sender verification

**Implementation**: Similar to Resend (see Adding New Providers)

---

## Best Practices

### Security

1. **Never expose API keys**: Use environment variables
2. **Validate server-side**: Always validate in provider (don't trust client)
3. **Escape HTML**: Prevent XSS in email templates
4. **Rate limiting**: Consider adding rate limits to `/api/contact`
5. **CSRF protection**: For more complex forms, add CSRF tokens

### Error Handling

1. **User-friendly messages**: Don't expose technical errors to users
2. **Log detailed errors**: Use `console.error` for debugging
3. **Fallback contact**: Always offer email as backup ("...or email us at...")
4. **Graceful degradation**: If form fails, user can still email

### Testing

1. **Test in dev**: Always test with console logging first
2. **Test in staging**: Use separate email/API keys for staging
3. **Monitor production**: Check email delivery rates
4. **Have rollback plan**: Keep provider switching easy

---

## Future Enhancements

### Spam Protection

Add honeypot field:

```html
<input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
```

```typescript
// In provider
if (data.website) {
  return { success: false, message: 'Spam detected' };
}
```

### Rate Limiting

Use Cloudflare Workers KV to track submissions by IP.

### Email Templates

Use provider's template engine (SendGrid, Resend) for branded emails.

### Database Storage

Store submissions in Cloudflare D1 for record-keeping.

---

**Questions?** This architecture is designed to be simple and flexible. When in doubt:
- Start with console logging (CloudflareFormProvider in dev mode)
- Test locally before deploying
- Keep provider logic isolated
- Document your changes

---

**Last Updated**: 2025-11-25
**Maintained By**: RBK Strategies Development Team

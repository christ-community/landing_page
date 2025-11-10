import { NextRequest, NextResponse } from 'next/server';
import emailService from '@/lib/email';
import { EmailValidator } from '@/lib/email-validator';
import type { EmailRecipient, EmailSendResult } from '@/types/dashboard';

// Verify authentication
function isAuthenticated(request: NextRequest): boolean {
  const sessionToken = request.cookies.get('dashboard-session')?.value;
  if (!sessionToken) return false;

  try {
    const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8');
    const [, timestamp] = decoded.split(':');
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 60 * 60 * 24 * 1000; // 24 hours

    return tokenAge <= maxAge;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { recipients, subject, htmlContent, dryRun } = await request.json();

    // Validate input
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Recipients array is required' },
        { status: 400 }
      );
    }

    if (!subject || !htmlContent) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      );
    }

    // Validate all email addresses
    const validationResults = await EmailValidator.validateBatch(
      recipients.map((r: EmailRecipient) => r.email)
    );

    const invalidEmails = validationResults.filter(r => !r.isValid);
    const unsafeEmails = validationResults.filter(r => r.isValid && !r.isSafe);

    // If dry run, return validation results without sending
    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        totalRecipients: recipients.length,
        validEmails: validationResults.filter(r => r.isValid && r.isSafe).length,
        invalidEmails: invalidEmails.length,
        unsafeEmails: unsafeEmails.length,
        invalidEmailsList: invalidEmails,
        unsafeEmailsList: unsafeEmails,
        previewHtml: htmlContent,
      });
    }

    // Filter to only safe, valid emails
    const safeRecipients = recipients.filter((r: EmailRecipient) => {
      const validation = validationResults.find(v => v.email === r.email.toLowerCase());
      return validation?.isValid && validation?.isSafe;
    });

    if (safeRecipients.length === 0) {
      return NextResponse.json(
        { error: 'No valid email addresses found' },
        { status: 400 }
      );
    }

    // Send emails in batches to prevent overwhelming SMTP server
    const BATCH_SIZE = 10;
    const BATCH_DELAY = 2000; // 2 seconds between batches
    const results: EmailSendResult[] = [];

    for (let i = 0; i < safeRecipients.length; i += BATCH_SIZE) {
      const batch = safeRecipients.slice(i, i + BATCH_SIZE);
      
      // Send batch
      const batchPromises = batch.map(async (recipient: EmailRecipient) => {
        try {
          // Personalize the email content
          const personalizedHtml = htmlContent
            .replace(/\{name\}/g, recipient.name)
            .replace(/\{email\}/g, recipient.email);

          const success = await emailService.sendEmail({
            to: recipient.email,
            subject: subject,
            html: personalizedHtml,
          });

          return {
            email: recipient.email,
            name: recipient.name,
            success,
            error: success ? undefined : 'Failed to send email',
          };
        } catch (error) {
          return {
            email: recipient.email,
            name: recipient.name,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Wait between batches (except for last batch)
      if (i + BATCH_SIZE < safeRecipients.length) {
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      totalRecipients: recipients.length,
      validRecipients: safeRecipients.length,
      sent: successCount,
      failed: failureCount,
      invalidEmails: invalidEmails.length,
      unsafeEmails: unsafeEmails.length,
      results,
      invalidEmailsList: invalidEmails,
      unsafeEmailsList: unsafeEmails,
    });

  } catch (error) {
    console.error('Bulk email send error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

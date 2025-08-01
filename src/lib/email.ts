import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: string;
  subject: string;
  message: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail({ to, subject, html, from }: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: from || process.env.FROM_EMAIL || process.env.SMTP_USER,
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendContactFormEmail(data: ContactEmailData): Promise<boolean> {
    const { firstName, lastName, email, phone, inquiryType, subject, message } = data;

    // Send email to your team
    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #1e40af; }
            .message { background: white; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
              <p>A new message has been received from your website</p>
            </div>
            <div class="content">
              <div class="field">
                <strong>Name:</strong> ${firstName} ${lastName}
              </div>
              <div class="field">
                <strong>Email:</strong> ${email}
              </div>
              <div class="field">
                <strong>Phone:</strong> ${phone || 'Not provided'}
              </div>
              <div class="field">
                <strong>Inquiry Type:</strong> ${inquiryType}
              </div>
              <div class="field">
                <strong>Subject:</strong> ${subject}
              </div>
              
              <div class="message">
                <strong>Message:</strong><br>
                ${message.replace(/\n/g, '<br>')}
              </div>
              
              <div class="footer">
                <p>Submitted on: ${new Date().toLocaleString()}</p>
                <p>Reply directly to this email to respond to ${firstName}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send confirmation email to user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for contacting us</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .message-summary { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .logo { width: 60px; height: 60px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">✉️</div>
              <h1>Thank You for Reaching Out!</h1>
              <p>We've received your message and will get back to you soon</p>
            </div>
            <div class="content">
              <p>Dear ${firstName},</p>
              
              <p>Thank you for contacting Christ Community. We've received your message and appreciate you taking the time to reach out to us.</p>
              
              <div class="message-summary">
                <h3>Your Message Summary:</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
                <p><strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
              </div>
              
              <p>We typically respond to all inquiries within 24-48 hours during business days. If your matter is urgent, please don't hesitate to call us directly.</p>
              
              <p>In the meantime, we invite you to:</p>
              <ul>
                <li>Join us for Sunday service at 9:00 AM or 11:00 AM</li>
                <li>Explore our website to learn more about our ministries</li>
                <li>Follow us on social media for updates and inspiration</li>
              </ul>
              
              <div class="footer">
                <p>Blessings,<br><strong>The Christ Community Team</strong></p>
                <p>📧 hello@christcommunity.org | 📞 (555) 123-4567</p>
                <p>123 Faith Street, Hope City, HC 12345</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      // Send email to team
      const teamEmailSent = await this.sendEmail({
        to: process.env.CONTACT_EMAIL || 'contact@christcommunity.org',
        subject: `New Contact Form: ${subject}`,
        html: teamEmailHtml,
      });

      // Send confirmation to user
      const userEmailSent = await this.sendEmail({
        to: email,
        subject: 'Thank you for contacting Christ Community',
        html: userEmailHtml,
      });

      return teamEmailSent && userEmailSent;
    } catch (error) {
      console.error('Failed to send contact form emails:', error);
      return false;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('SMTP connection verified successfully');
      return true;
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
export default emailService;
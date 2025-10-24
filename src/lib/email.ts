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

interface FreeBibleEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  translation: string;
  specialRequests?: string;
}

interface SendHelpEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface OrderTractEmailData {
  name: string;
  email: string;
  address: string;
  tractId: string;
  quantity: number;
}

interface NewsletterEmailData {
  email: string;
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
              
              
              <div class="footer">
                <p>Blessings,<br><strong>The Christ Community Team</strong></p>
                <p>📧 info@christcommunityglobal.org | 📞 07428784005</p>
                <p>47B Westbury Street, Swansea SA1 4JW</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      // Send email to team
      const teamEmailSent = await this.sendEmail({
        to: process.env.CONTACT_EMAIL || 'info@christcommunityglobal.org',
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

  async sendFreeBibleEmail(data: FreeBibleEmailData): Promise<boolean> {
    const { firstName, lastName, email, phone, address, city, state, zipCode, country, translation, specialRequests } = data;

    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Free Bible Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #059669; }
            .address-box { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📖 Free Bible Request</h1>
              <p>A new request for a free Bible has been received</p>
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
                <strong>Bible Translation:</strong> ${translation}
              </div>
              
              <div class="address-box">
                <strong>Shipping Address:</strong><br>
                ${address}<br>
                ${city}, ${state} ${zipCode}<br>
                ${country}
              </div>
              
              ${specialRequests ? `
                <div class="field">
                  <strong>Special Requests:</strong><br>
                  ${specialRequests.replace(/\n/g, '<br>')}
                </div>
              ` : ''}
              
              <div class="footer">
                <p>Submitted on: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Free Bible Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .summary-box { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .logo { width: 60px; height: 60px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">📖</div>
              <h1>Your Free Bible is Coming!</h1>
              <p>We've received your request and will process it soon</p>
            </div>
            <div class="content">
              <p>Dear ${firstName},</p>
              
              <p>Thank you for requesting a free Bible from Christ Community. We're excited to send you God's Word!</p>
              
              <div class="summary-box">
                <h3>Your Request Details:</h3>
                <p><strong>Bible Translation:</strong> ${translation}</p>
                <p><strong>Shipping Address:</strong> ${address}, ${city}, ${state} ${zipCode}</p>
                ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Your Bible will be processed and shipped within 2-3 business days</li>
                <li>You'll receive a tracking number once it ships</li>
                <li>Delivery typically takes 5-7 business days</li>
                <li>Absolutely no cost to you - this is our gift!</li>
              </ul>
              
              <p>We pray that God's Word will bless you richly. If you have any questions or need spiritual guidance, please don't hesitate to reach out.</p>
              
              <div class="footer">
                <p>Blessings,<br><strong>The Christ Community Team</strong></p>
                <p>📧 info@christcommunityglobal.org | 📞 07428784005</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const teamEmailSent = await this.sendEmail({
        to: process.env.CONTACT_EMAIL || 'info@christcommunityglobal.org',
        subject: `Free Bible Request - ${translation} for ${firstName} ${lastName}`,
        html: teamEmailHtml,
      });

      const userEmailSent = await this.sendEmail({
        to: email,
        subject: 'Your Free Bible Request - Christ Community',
        html: userEmailHtml,
      });

      return teamEmailSent && userEmailSent;
    } catch (error) {
      console.error('Failed to send Free Bible emails:', error);
      return false;
    }
  }

  async sendSendHelpEmail(data: SendHelpEmailData): Promise<boolean> {
    const { name, email, subject, message } = data;

    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Send Help Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #dc2626; }
            .message { background: white; padding: 20px; border-left: 4px solid #ef4444; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>❤️ Send Help Request</h1>
              <p>A new partnership inquiry has been received</p>
            </div>
            <div class="content">
              <div class="field">
                <strong>Name:</strong> ${name}
              </div>
              <div class="field">
                <strong>Email:</strong> ${email}
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
                <p>Reply directly to this email to respond to ${name}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for your partnership inquiry</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .summary-box { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .logo { width: 60px; height: 60px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">❤️</div>
              <h1>Thank You for Your Heart to Help!</h1>
              <p>We've received your partnership inquiry</p>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <p>Thank you for your heart to serve and partner with Christ Community. Your desire to help is truly a blessing!</p>
              
              <div class="summary-box">
                <h3>Your Message:</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p>${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
              </div>
              
              <p>We typically respond to partnership inquiries within 24-48 hours. Our team is excited to explore how we can work together to serve God's kingdom and bless our community.</p>
              
              <p>In the meantime, here are ways you can get involved:</p>
              <ul>
                <li>Pray for our ministry and the people we serve</li>
                <li>Join us for Sunday worship and community events</li>
                <li>Volunteer opportunities are available in various ministries</li>
                <li>Consider supporting our outreach programs</li>
              </ul>
              
              <div class="footer">
                <p>Blessings,<br><strong>The Christ Community Team</strong></p>
                <p>📧 info@christcommunityglobal.org | 📞 07428784005</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const teamEmailSent = await this.sendEmail({
        to: process.env.CONTACT_EMAIL || 'info@christcommunityglobal.org',
        subject: `Send Help Request: ${subject}`,
        html: teamEmailHtml,
      });

      const userEmailSent = await this.sendEmail({
        to: email,
        subject: 'Thank you for your partnership inquiry - Christ Community',
        html: userEmailHtml,
      });

      return teamEmailSent && userEmailSent;
    } catch (error) {
      console.error('Failed to send Send Help emails:', error);
      return false;
    }
  }

  async sendOrderTractEmail(data: OrderTractEmailData): Promise<boolean> {
    const { name, email, address, tractId, quantity } = data;

    // Map tract IDs to names (this should ideally come from a database or config)
    const tractNames: Record<string, string> = {
      '1': 'The Four Spiritual Laws',
      '2': 'More Than a Carpenter',
      '3': 'The Case for Christ',
      '4': 'God\'s Love Story',
      '5': 'Las Cuatro Leyes Espirituales',
      '6': 'Finding Hope'
    };

    const tractName = tractNames[tractId] || `Tract ID: ${tractId}`;

    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Tract Order Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #0f766e; }
            .order-box { background: white; padding: 20px; border-left: 4px solid #0d9488; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📋 Tract Order Request</h1>
              <p>A new tract order has been received</p>
            </div>
            <div class="content">
              <div class="field">
                <strong>Name:</strong> ${name}
              </div>
              <div class="field">
                <strong>Email:</strong> ${email}
              </div>
              
              <div class="order-box">
                <h3>Order Details:</h3>
                <p><strong>Tract:</strong> ${tractName}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <p><strong>Shipping Address:</strong><br>${address}</p>
              </div>
              
              <div class="footer">
                <p>Submitted on: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Tract Order Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .order-box { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .logo { width: 60px; height: 60px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">📋</div>
              <h1>Tract Order Received!</h1>
              <p>We're processing your tract request</p>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <p>Thank you for ordering tracts from Christ Community! We're excited to provide you with these resources for sharing God's love.</p>
              
              <div class="order-box">
                <h3>Your Order:</h3>
                <p><strong>Tract:</strong> ${tractName}</p>
                <p><strong>Quantity:</strong> ${quantity} tracts</p>
                <p><strong>Shipping Address:</strong> ${address}</p>
                <p><strong>Cost:</strong> FREE (donations appreciated)</p>
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Your tracts will be processed and shipped within 3-5 business days</li>
                <li>Shipping is completely free</li>
                <li>You'll receive a tracking number once they ship</li>
                <li>If you'd like to support this ministry, donations are always appreciated but never required</li>
              </ul>
              
              <p>Thank you for helping us spread God's Word in your community!</p>
              
              <div class="footer">
                <p>Blessings,<br><strong>The Christ Community Team</strong></p>
                <p>📧 info@christcommunityglobal.org | 📞 07428784005</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const teamEmailSent = await this.sendEmail({
        to: process.env.CONTACT_EMAIL || 'info@christcommunityglobal.org',
        subject: `Tract Order: ${quantity}x ${tractName} for ${name}`,
        html: teamEmailHtml,
      });

      const userEmailSent = await this.sendEmail({
        to: email,
        subject: 'Your Tract Order Confirmation - Christ Community',
        html: userEmailHtml,
      });

      return teamEmailSent && userEmailSent;
    } catch (error) {
      console.error('Failed to send tract order emails:', error);
      return false;
    }
  }

  async sendNewsletterSignupEmail(data: NewsletterEmailData): Promise<boolean> {
    const { email } = data;

    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Newsletter Signup</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #4f46e5; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Newsletter Signup</h1>
              <p>Someone new joined your mailing list</p>
            </div>
            <div class="content">
              <div class="field">
                <strong>Email:</strong> ${email}
              </div>
              
              <div class="footer">
                <p>Signed up on: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Christ Community Newsletter</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .welcome-box { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .logo { width: 60px; height: 60px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">📧</div>
              <h1>Welcome to Our Newsletter!</h1>
              <p>Thanks for joining the Christ Community family</p>
            </div>
            <div class="content">
              <p>Thank you for subscribing to the Christ Community newsletter!</p>
              
              <div class="welcome-box">
                <h3>What to expect:</h3>
                <ul>
                  <li>Weekly updates about our community and events</li>
                  <li>Inspiring messages and devotionals</li>
                  <li>Information about volunteer opportunities</li>
                  <li>Prayer requests and celebrations</li>
                  <li>Special announcements and invitations</li>
                </ul>
              </div>
              
              <p>We're excited to keep you connected with everything happening in our community. You'll receive your first newsletter within the next few days.</p>
              
              <p>If you ever want to unsubscribe, there will be a link at the bottom of every newsletter.</p>
              
              <div class="footer">
                <p>Blessings,<br><strong>The Christ Community Team</strong></p>
                <p>📧 info@christcommunityglobal.org | 📞 07428784005</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const teamEmailSent = await this.sendEmail({
        to: process.env.CONTACT_EMAIL || 'info@christcommunityglobal.org',
        subject: `New Newsletter Signup: ${email}`,
        html: teamEmailHtml,
      });

      const userEmailSent = await this.sendEmail({
        to: email,
        subject: 'Welcome to Christ Community Newsletter!',
        html: userEmailHtml,
      });

      return teamEmailSent && userEmailSent;
    } catch (error) {
      console.error('Failed to send newsletter signup emails:', error);
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
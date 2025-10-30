import dotenv from 'dotenv';

dotenv.config();

/**
 * Send email using Brevo API (alternative to SMTP)
 * Install: npm install @getbrevo/brevo
 */

// Uncomment and use this if SMTP continues to fail
/*
import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';

const apiInstance = new TransactionalEmailsApi();
apiInstance.setApiKey('api-key', process.env.BREVO_API_KEY);

export async function sendEmailViaAPI(to, subject, htmlContent) {
  try {
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { 
      name: "FlagForge Store", 
      email: process.env.BREVO_USER 
    };
    sendSmtpEmail.to = [{ email: to }];

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent via API:', result.messageId);
    return result;
  } catch (error) {
    console.error('API email error:', error);
    throw error;
  }
}
*/

// Fallback using fetch (no additional dependencies)
export async function sendEmailViaBrevoAPI(to, subject, htmlContent) {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: "FlagForge Store",
          email: process.env.BREVO_USER
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Brevo API error: ${error.message || response.statusText}`);
    }

    const result = await response.json();
    console.log('Email sent via Brevo API:', result.messageId);
    return result;
  } catch (error) {
    console.error('Brevo API email error:', error);
    throw error;
  }
}

// Test function for the API
export async function testBrevoAPI() {
  try {
    console.log('Testing Brevo API...');
    
    if (!process.env.BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY not found in environment variables');
    }

    await sendEmailViaBrevoAPI(
      'hadamanash2023@gmail.com',
      'Brevo API Test - ' + new Date().toISOString(),
      `
        <h2>🎉 Brevo API Test Successful!</h2>
        <p>This email was sent using the Brevo API instead of SMTP.</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><em>FlagForge Store Email System</em></p>
      `
    );
    
    console.log('✅ Brevo API test successful!');
  } catch (error) {
    console.error('❌ Brevo API test failed:', error.message);
  }
}
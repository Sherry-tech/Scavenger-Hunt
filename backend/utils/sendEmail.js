const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(recipient, subject, htmlBody) {
  const msg = {
    to: recipient,
    from: 'umair_05@hotmail.com', // verified sender umair_05@hotmail.com
    subject,
    html: htmlBody,
  }

 try {
    const response = await sgMail.send(msg)
    console.log('Email sent successfully', response[0].statusCode)
    return { success: true, statusCode: response[0].statusCode }
  } catch (error) {
    console.error(error)
    return { success: false, error }
  }
}

module.exports = sendEmail
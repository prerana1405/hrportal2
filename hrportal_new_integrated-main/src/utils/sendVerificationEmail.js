import { createMailTransport } from "./createMailTransport.js";

const sendVerificationMail = async (userData) => {
    // Create a mail transporter
    const transporter = createMailTransport();
     console.log(userData);
    // Set up mail options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userData.email,
        subject: "Verify your email",
        html: `
        "<p>Please verify your email by clicking the link below:</p>
        <a href="http://localhost:3000/verify-email/${userData.email}">Verify Email</a>
            
        `
    };
    if (!mailOptions.to) {
        console.error('Recipient email not defined');
        return;
      }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error while sending verification email:", error);
        } else {
            console.log("Verification email sent:", info.response);
        }
    });
};

export { sendVerificationMail };

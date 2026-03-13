import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"Jobsy" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: `
        <div style="font-family: Arial; padding:20px">
          <h2>${subject}</h2>
          <p>${text}</p>
        </div>
      `
    });

    console.log("Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error("Email error:", error.message);
    throw new Error("Email sending failed");
  }
};


export const sendOtpEmail = async (email, otp) => {

  const subject = "OTP Verification - Jobsy";

  const text = `Your OTP is: ${otp}
This OTP will expire in 5 minutes.

If you did not request this, please ignore this email.`;

  return await sendEmail(email, subject, text);
};
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: parseInt(process.env.MAILTRAP_SMTP_PORT),
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email send process failed, Make sure you provide brevo credentials in .env file."
    );
    console.error("Error : ", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "We have here to serve you.",
      action: {
        instruction: "Please click the button for verify email.",
        button: {
          color: "#0a0a0a",
          text: "Verify",
          link: verificationUrl,
        },
      },
      outro: "If you have query, Reach out.",
    },
  };
};

const forgotPasswordMailgenContent = (username, forgotPasswordUrl) => {
  return {
    body: {
      name: username,
      intro: "We have a request to reset the password.",
      action: {
        instruction: "Please click it to reset your password.",
        button: {
          color: "#0a0a0a",
          text: "Reset",
          link: forgotPasswordUrl,
        },
      },
      outro: "Asked question? Send to this email.",
    },
  };
};

export {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};

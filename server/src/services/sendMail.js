import nodemailer from "nodemailer";

// type mailOptions = {
//     to: string,
//     subject: string,
//     html?: string
// }


const sendEmail = async (data) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: process.env.GOOGLE_MAIL_APP_EMAIL,
                pass: process.env.GOOGLE_MAIL_APP_PASSWORD
            },
        });
        const mailOptions = {
            from: process.env.GOOGLE_MAIL_APP_EMAIL,
            to: data.to,
            subject: data.subject,
            html: data.html || "",
        };

        await transporter.sendMail(mailOptions);
        console.log("email sent successfully");
        return true;
    } catch (error) {
        console.log(error, "email sent fail");
        return false;
    }
};

export default sendEmail
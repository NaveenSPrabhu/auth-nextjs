import nodemailer from 'nodemailer';
import User from "@/modules/userModel";
import bcrypt from 'bcryptjs';


export const sendEmail= async ({email, emailType, userId}: any) => {
    try {
        //create a hashed token using bcrypt
        const token = await bcrypt.hash(userId.toString(),10);
        if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, {verifyToken: token, verifyTokenExpiry: Date.now() + 3600000});
        }else if(emailType === "RESET"){
                await User.findByIdAndUpdate(userId, {forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 3600000});

        } 
        var transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "7329ca1a64a822",
                    pass: "4ebd635f3d1637"
                }
        });

        const mailOptions = {
            from: 'naveen@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Account" : "Reset Your Password",
            html: `<p>Click <a href="http://localhost:3000/${emailType === "VERIFY" ? "verify" : "reset-password"}?token=${token}">here</a> to ${emailType === "VERIFY" ? "verify your account" : "reset your password"}
            or copy this link and paste it in your browser: <br> ${process.env.domain}/verifyemail?token=${token}</p>`
        };
        const mailres=await transporter.sendMail(mailOptions);
        return mailres;
    }catch (error: any) {
        throw new Error(error);
    }
}
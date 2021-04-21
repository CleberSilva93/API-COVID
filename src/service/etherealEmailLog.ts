import nodemailer from "nodemailer";

export default class etherealEmailLog {
    public execute = async () => {
        console.log("Credentials obtainer, sending message...");

        // let transporter = nodemailer.createTransport({
        //     // service: process.env.EMAIL_SERVICE,
        //     host: process.env.EMAIL_HOST,
        //     ignoreTLS: false,
        //     secure: false,
        //     port: 587,
        //     auth: {
        //         user: process.env.EMAIL_AUTH_USER,
        //         pass: process.env.EMAIL_AUTH_PASS,
        //     },
        // });
        let transporter = nodemailer.createTransport({
            // service: process.env.EMAIL_SERVICE,
            host: "smtpout.secureserver.net",
            ignoreTLS: false,
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PASS,
            },
        });

        const mailList = [
            "mcorreadesign@gmail.com",
            `${process.env.EMAIL_SEND}`,
        ];

        let message = {
            from: process.env.EMAIL_AUTH_USER || "",
            to: mailList,
            subject: `Updated API-Covid 19 - ${new Date()}`,
            text: "Updated API-Covid to today.",
            html:
                "<p><b> Hello</b> this is the email to inform the update the API-Covid Piracicaba</p>",
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("Error ocurred. " + err.message);
                return process.exit();
            }

            console.log("Message set: %s", info.messageId);
        });
    };
}

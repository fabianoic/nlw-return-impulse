import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mailAdaptar";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6b20ab70df0f8f",
        pass: "61d2b92c51b4e3"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendEmail({ subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Fabiano Campos <fabiano.fic@gmail.com>',
            subject,
            html: body,
        })
    }
}
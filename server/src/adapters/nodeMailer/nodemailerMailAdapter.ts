import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c717689b1c9afb",
      pass: "4286f5f6e11d1d"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
     async sendMail ({subject,body}: SendMailData): Promise<void>{
        await transport.sendMail({
            from:'Equipe Feedget <David@menufast.com>',
            to:'Carlos Miguel de Lara <delaracarlosmiguel@gmail.com>',
            subject,
            html:body,
        });
     }


}
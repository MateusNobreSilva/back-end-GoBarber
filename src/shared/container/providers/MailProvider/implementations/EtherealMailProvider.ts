import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from "../models/IMailProvider";


export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      console.log("dsaswaqew");
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      console.log("account");
      console.log(account);

      this.client = transporter;
    });

  }
  
  public async sendEmail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GOBarber <equipe@gobarber.com>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";

import { injectable, inject } from "tsyringe";


import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });

  }

  public async sendEmail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    console.log('Funcionou');
  }
}
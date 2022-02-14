import { container } from "tsyringe";
import mailConfig from '@config/mail';



import IMailTemplateProvider from './models/IMailTemplateProvider';

import EtherealMailProvider from '../MailProvider/implementations/EtherealMailProvider';// './implementations/EtherealMailProvider';
import HandlebarsMailTemplateProvider from "./implementations/HandlebarsMailTemplateProvider.ts";


const providers = {
  handlebars: HandlebarsMailTemplateProvider,
}


container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
  // container.resolve(
  // mailConfig.driver === 'ethereal'
  //   ? container.resolve(EtherealMailProvider)
  //   : container.resolve(SESMailProvider),
  //  )
  // container.resolve(EtherealMailProvider),
);

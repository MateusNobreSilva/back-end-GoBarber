import { container } from "tsyringe";
import mailConfig from '@config/mail';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import SESMailProvider from './MailProvider/implementations/SESMailProvider';


import IMailTemplateProvider from "./MailProvider/models/IMailProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider.ts";

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);


container.registerInstance<IMailProvider>(
  'MailProvider',
  // container.resolve(
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
  //  )
  // container.resolve(EtherealMailProvider),
);


// container.registerInstance<IMailProvider>(
//   'MailProvider',
//   container.resolve(EtherealMailProvider),
// );


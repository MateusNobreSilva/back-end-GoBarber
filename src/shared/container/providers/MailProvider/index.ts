import { container } from "tsyringe";
import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);

/*
container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[mailConfig.driver],
  // container.resolve(
  // mailConfig.driver === 'ethereal'
  //   ? container.resolve(EtherealMailProvider)
  //   : container.resolve(SESMailProvider),
  //  )
  // container.resolve(EtherealMailProvider),
);
*/
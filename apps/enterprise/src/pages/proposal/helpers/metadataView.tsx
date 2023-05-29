import { ReactNode } from 'react';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';
import { LogoValueView } from '../LogoValueView';

export interface MetadataView extends Record<string, ReactNode> {
  discord: ReactNode;
  github: ReactNode;
  telegram: ReactNode;
  twitter: ReactNode;
  logo: ReactNode;
  name: ReactNode;
}

export const metadataViewFieldNameRecord: Record<keyof MetadataView, string> = {
  discord: 'Discord',
  github: 'Github',
  telegram: 'Telegram',
  twitter: 'Twitter',
  logo: 'Logo',
  name: 'Name',
  description: 'Description',
};

const noValue = 'null';

const formatLogo = (logo: enterprise.Logo | null | undefined) =>
  logo ? (logo === 'none' ? noValue : logo.url) : noValue;

export const getUpdatedFields = (msg: enterprise.UpdateMetadataMsg): Partial<MetadataView> => {
  const view: Partial<MetadataView> = {};

  if (msg.discord_username !== 'no_change') {
    view.discord = msg.discord_username.change || noValue;
  }

  if (msg.github_username !== 'no_change') {
    view.github = msg.github_username.change || noValue;
  }

  if (msg.telegram_username !== 'no_change') {
    view.telegram = msg.telegram_username.change || noValue;
  }

  if (msg.twitter_username !== 'no_change') {
    view.twitter = msg.twitter_username.change || noValue;
  }

  if (msg.logo !== 'no_change') {
    view.logo = <LogoValueView value={formatLogo(msg.logo.change)} />;
  }

  if (msg.name !== 'no_change') {
    view.name = msg.name.change || noValue;
  }

  if (msg.description && msg.description !== 'no_change') {
    view.description = msg.description.change || noValue;
  }

  return view;
};

export const fromDao = (dao: DAO): MetadataView => {
  const {
    name,
    logo = noValue,
    description = noValue,
    socials: {
      discord_username = noValue,
      github_username = noValue,
      twitter_username = noValue,
      telegram_username = noValue,
    },
  } = dao;

  return {
    discord: discord_username,
    github: github_username,
    telegram: telegram_username,
    twitter: twitter_username,
    logo: logo === noValue ? noValue : <LogoValueView value={logo} />,
    name,
    description,
  };
};

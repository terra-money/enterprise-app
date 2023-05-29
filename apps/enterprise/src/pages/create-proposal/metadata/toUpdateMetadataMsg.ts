import { enterprise } from 'types/contracts';
import { DAO } from 'types';
import { MetadataProposalFormInput } from './useMetadataForm';

export const hasChangedFields = (msg: Record<string, any>) => Object.values(msg).some((value) => value !== 'no_change');

const hasSocialChanged = (one: string | null | undefined, another: string | null | undefined) => {
  if (!one && !another) {
    return false;
  }

  return one !== another;
};

export const toUpdateMetadataMsg = (
  dao: DAO,
  {
    discordUsername,
    githubUsername,
    telegramUsername,
    twitterUsername,
    logo,
    name,
    description,
  }: MetadataProposalFormInput
): enterprise.UpdateMetadataMsg => {
  const msg: enterprise.UpdateMetadataMsg = {
    discord_username: 'no_change',
    github_username: 'no_change',
    telegram_username: 'no_change',
    twitter_username: 'no_change',
    logo: 'no_change',
    name: 'no_change',
    description: 'no_change',
  };

  if (hasSocialChanged(dao.socials.discord_username, discordUsername)) {
    msg.discord_username = { change: discordUsername || null };
  }

  if (hasSocialChanged(dao.socials.github_username, githubUsername)) {
    msg.github_username = { change: githubUsername || null };
  }

  if (hasSocialChanged(dao.socials.telegram_username, telegramUsername)) {
    msg.telegram_username = { change: telegramUsername || null };
  }

  if (hasSocialChanged(dao.socials.twitter_username, twitterUsername)) {
    msg.twitter_username = { change: twitterUsername || null };
  }

  if (dao.name !== name) {
    msg.name = { change: name };
  }

  if (description && dao.description !== description) {
    msg.description = { change: description };
  }

  if (logo && (!dao.logo || logo !== dao.logo)) {
    msg.logo = { change: { url: logo } };
  }

  if (!logo && dao.logo) {
    msg.logo = { change: 'none' };
  }
  return msg;
};

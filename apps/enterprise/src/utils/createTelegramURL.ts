export const createTelegramURL = (username: string) => {
  if (username.startsWith('t.me/')) {
    return `https://${username}`;
  }

  if (username.startsWith('@')) {
    username = username.slice(1);
  }

  return `https://t.me/${username}`;
};

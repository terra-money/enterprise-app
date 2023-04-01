export const createTelegramURL = (username: string) => {
  if (username.startsWith("t.me/")) {
    return `t.me/${username}`;
  }
  if (username.startsWith("@")) {
    return `@${username}`;
  }
  return `https://t.me/${username}`;
};

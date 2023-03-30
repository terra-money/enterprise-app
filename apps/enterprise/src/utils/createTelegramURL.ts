export const createTelegramURL = (username: string) => {
  if (username.startsWith("https://t.me/")) {
    return `https://t.me/${username}`;
  }
  if (username.startsWith("t.me/")) {
    return `t.me/${username}`;
  }
  if (username.startsWith("@")) {
    return `@${username}`;
  }
  return `${username}`;
};

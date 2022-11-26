export const validateAddress = (input: string) => {
  var regex =
    /(terra([a-z0-9]{39}|[a-z0-9]{59})\b)|(terravaloper[a-z0-9]{39}\b)|([a-z0-9-]+\.ust\b)/;
  if (regex.test(input)) {
    return undefined;
  } else {
    return "Invalid Terra address";
  }
};

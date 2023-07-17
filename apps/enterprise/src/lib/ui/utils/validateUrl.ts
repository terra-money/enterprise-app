export const validateUrl = (url: string) => {
  var inputElement = document.createElement('input');
  inputElement.type = 'url';
  inputElement.value = url;

  if (!inputElement.checkValidity()) {
    return 'Invalid URL';
  }
};

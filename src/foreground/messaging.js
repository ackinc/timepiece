export function sendMessage(message) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ message }, function (response) {
      resolve(response);
    });
  });
}

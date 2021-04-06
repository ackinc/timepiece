import { set } from "../common/storage";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  set({ message: request.message }).then(() =>
    sendResponse({ message: "Thank you for your message" })
  );
  return true;
});

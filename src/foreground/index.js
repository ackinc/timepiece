import { sendMessage } from "./messaging";

alert("Content script: I am sending a message to the background script");
(async () => {
  const response = await sendMessage("Hello");
  alert(
    `Content script: Background script responded with "${response.message}"`
  );
})();
alert("Content script: I have sent a message to the background script");

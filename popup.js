document.getElementById('on').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "CONNECT" });
  alert("Connect signal sent!");
});

document.getElementById('off').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "DISCONNECT" });
  alert("Disconnect signal sent!");
});
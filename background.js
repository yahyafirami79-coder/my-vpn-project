const proxyConfig = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "socks5", // Match this to the table (http or socks5)
      host: "98.170.57.241", 
      port: 4145
    }
  }
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "CONNECT") {
    chrome.proxy.settings.set({ value: proxyConfig, scope: 'regular' }, () => {
      console.log("VPN ACTIVE: Routing through proxy.");
    });
  } else if (request.action === "DISCONNECT") {
    chrome.proxy.settings.clear({ scope: 'regular' }, () => {
      console.log("VPN INACTIVE: Proxy cleared.");
    });
  }
});

// THIS WILL SHOW ERRORS IN THE SERVICE WORKER CONSOLE
chrome.proxy.onProxyError.addListener((details) => {
  console.error("PROXY NETWORK ERROR:", details.error);
});
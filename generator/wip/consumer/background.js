chrome.runtime.onInstalled.addListener(() => {
    // Initialization logic, if needed
  });
  
  chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
      const { url, ip, certificate } = details;
      const uri = new URL(url);
      const filename = uri.pathname.substring(1); // Extract filename from URI
      const checksum = calculateChecksum(filename); // Implement your checksum calculation function
  
      const sanEntries = extractSanEntries(certificate);
      const validChecksum = sanEntries.some(entry => entry === `otherName.1 = 1.3.6.1.4;FORMAT:HEX,OCT:${checksum}`);
  
      if (validChecksum) {
        chrome.browserAction.setIcon({ path: "images/icon_green.png" });
      } else {
        chrome.browserAction.setIcon({ path: "images/icon_red.png" });
      }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] },
    ["blocking", "responseHeaders"]
  );
  
  function extractSanEntries(certificate) {
    // Implement logic to extract SAN entries from the certificate
    // Example: return certificate.subjectAlternativeName.map(entry => entry.value);
    return [];
  }
  
  function calculateChecksum(filename) {
    // Implement your SHA256 checksum calculation logic using SHA256.js library
    // Example: return sha256(filename);
    return "";
  }
  
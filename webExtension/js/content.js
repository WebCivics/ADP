// content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'checkDns') {
      const domain = window.location.hostname;
      fetchDnsTxtRecord(domain);
    }
  });
  
function fetchDnsTxtRecord(domain) {
  // Fetch and parse DNS TXT record
  // Extract ADP JSON-LD URI and checksum
  // Validate checksum
  // Process JSON-LD file

  let iconColor = 'grey'; // Default color

  // Check conditions and update iconColor accordingly
  if (hasADPEntryInDNS) {
    iconColor = 'green';
  } else if (userHasADPFile) {
    iconColor = 'red';
  }

  chrome.runtime.sendMessage({ action: 'updateIcon', iconColor });
}

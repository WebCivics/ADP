// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'saveAddressBookEntry') {
      // Save address book entry to storage
    }
  });
  
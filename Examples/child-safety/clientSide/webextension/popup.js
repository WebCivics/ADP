document.getElementById('save').addEventListener('click', function() {
    let rating = document.getElementById('rating').value;
    let password = document.getElementById('password').value;
  
    // Save settings to chrome storage
    chrome.storage.sync.set({ blockRating: rating, password: password }, function() {
      alert('Settings saved');
    });
  });
  
  // Load saved settings
  chrome.storage.sync.get(['blockRating', 'password'], function(items) {
    if (items.blockRating) {
      document.getElementById('rating').value = items.blockRating;
    }
    if (items.password) {
      document.getElementById('password').value = items.password;
    }
  });
  
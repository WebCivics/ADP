const gun = new Gun();

// Function to initialize chat
function initializeChat() {
  const chatMessages = document.getElementById('chatMessages');
  const messageInput = document.getElementById('messageInput');
  const sendMessageButton = document.getElementById('sendMessage');

  // Subscribe to the chat messages in GUN
  gun.get('chat').on(function (data) {
    // Display the chat messages
    chatMessages.innerHTML = '';
    Object.keys(data).forEach((key) => {
      chatMessages.innerHTML += `<div>${data[key]}</div>`;
    });
  });

  // Send a message when the button is clicked
  sendMessageButton.addEventListener('click', function () {
    const message = messageInput.value;
    if (message.trim() !== '') {
      // Save the message to GUN
      const messageId = new Date().getTime().toString();
      gun.get('chat').get(messageId).put(message);
      messageInput.value = '';
    }
  });
}

// Call the initializeChat function
initializeChat();
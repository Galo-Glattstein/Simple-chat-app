// Attach to window so accessible by inline onclick handlers
window.sendMessage = function(user) {
  const input = document.getElementById(user + 'Input');
  const text = input.value.trim();
  if (!text) return;

  const chatArea = document.getElementById('chat-area');

  const div = document.createElement('div');
  div.className = `chat-bubble ${user}`;

  const img = document.createElement('img');
  img.src = user === 'user1' ? 'user1.png' : 'user2.png'; // Replace with your image paths
  img.className = 'user-img';

  const contentDiv = document.createElement('div');
  contentDiv.style.display = 'flex';
  contentDiv.style.flexDirection = 'column';

  const nameSpan = document.createElement('strong');
  nameSpan.textContent = user === 'user1' ? 'User 1' : 'User 2';
  nameSpan.style.fontSize = '0.85rem';
  nameSpan.style.marginBottom = '3px';

  const msgSpan = document.createElement('span');
  msgSpan.textContent = text;

  contentDiv.appendChild(nameSpan);
  contentDiv.appendChild(msgSpan);

  div.appendChild(img);
  div.appendChild(contentDiv);

  chatArea.appendChild(div);

  input.value = '';
  chatArea.scrollTop = chatArea.scrollHeight;
}

window.addEmoji = function(inputId, emoji) {
  const input = document.getElementById(inputId);
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const text = input.value;

  input.value = text.slice(0, start) + emoji + text.slice(end);
  input.selectionStart = input.selectionEnd = start + emoji.length;
  input.focus();
}

// Emoji picker setup after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.emoji-btn').forEach(button => {
    const inputId = button.getAttribute('data-input');
    const input = document.getElementById(inputId);
    const picker = new EmojiButton();

    button.addEventListener('click', () => {
      picker.togglePicker(button);
    });

    picker.on('emoji', emoji => {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const text = input.value;
      input.value = text.slice(0, start) + emoji + text.slice(end);
      input.selectionStart = input.selectionEnd = start + emoji.length;
      input.focus();
    });
  });
});

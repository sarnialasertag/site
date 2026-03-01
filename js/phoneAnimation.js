import { sleep } from './utils.js';

export async function phoneAnimation() {
    const feed = document.getElementById('message-feed');
    const typingIndicator = document.getElementById('typing-indicator');

    const conversation = [
        { role: 1, text: "👋👋! Are you guys free this Friday? Wanna hit The Arena? There's a deal for four!", style: 'sent', name: 'Marcus', pic: 'images/ui/marcus.svg' }, 
        { role: 0, text: "Yup!", style: 'received', name: 'Alex', pic: 'images/ui/alex.svg' }, 
        { role: 0, text: "Sounds fun!", style: 'received-2', name: 'Darren', pic: 'images/ui/darren.svg' }, 
        { role: 0, text: "Duh!", style: 'received-3', name: 'Priya', pic: 'images/ui/priya.svg' } 
    ];

    function addMessage(role, text, style, name, pic) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', style);

        const avatarContainer = document.createElement('div');
        avatarContainer.classList.add('avatar-container');

        const profilePic = document.createElement('img');
        profilePic.src = pic;
        profilePic.alt = name;
        profilePic.onerror = function() {
            this.onerror = null;
            this.src = 'https://placehold.co/36x36/333/fff?text=' + name.charAt(0);
        };

        avatarContainer.appendChild(profilePic);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('message-content');

        const senderName = document.createElement('span');
        senderName.textContent = name;
        senderName.classList.add('sender-name');

        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble', style);
        bubble.textContent = text;

        contentWrapper.appendChild(senderName);
        contentWrapper.appendChild(bubble);

        messageContainer.appendChild(avatarContainer);
        messageContainer.appendChild(contentWrapper);

        feed.insertBefore(messageContainer, typingIndicator);

        setTimeout(() => {
            messageContainer.classList.add('visible');
            feed.scrollTop = feed.scrollHeight;
        }, 10);
    }

    function showTyping(show) {
        if (show) {
            typingIndicator.classList.add('visible');
            typingIndicator.style.opacity = '1';
            feed.scrollTop = feed.scrollHeight;
        } else {
            typingIndicator.classList.remove('visible');
            typingIndicator.style.opacity = '0';
        }
    }

    await sleep(500);
    feed.querySelectorAll('.message-container').forEach(b => b.remove());
    showTyping(false);

    const firstMsg = conversation[0];
    addMessage(firstMsg.role, firstMsg.text, firstMsg.style, firstMsg.name, firstMsg.pic);

    for (let i = 1; i < conversation.length; i++) {
        const msg = conversation[i];
        await sleep(1500);
        showTyping(true);
        await sleep(1000);
        showTyping(false);
        addMessage(msg.role, msg.text, msg.style, msg.name, msg.pic);
    }

    await sleep(6000);
    phoneAnimation();
}
document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const accordionItem = button.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const svg = button.querySelector('svg');
            // Toggle active class
            accordionItem.classList.toggle('active');
            // Rotate the chevron icon
            svg.classList.toggle('rotate-180');
            // Close other accordion items
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    const otherItem = otherButton.closest('.accordion-item');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    const otherSvg = otherButton.querySelector('svg');
                    otherItem.classList.remove('active');
                    otherContent.style.maxHeight = '0';
                    otherSvg.classList.remove('rotate-180');
                }
            });
        });
    });

    // Chat functionality
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    chatButton.addEventListener('click', () => {
        chatWindow.classList.add('open');
        chatButton.style.display = 'none';
    });
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        setTimeout(() => {
            chatButton.style.display = 'block';
        }, 300);
    });

    // Auto-responses for chat
    const chatInput = chatWindow.querySelector('input');
    const chatSendButton = chatWindow.querySelector('button');
    const chatMessages = document.getElementById('chatMessages');
    chatSendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        // Auto-response (simplified for demo)
        setTimeout(() => {
            const response = getAutoResponse(message.toLowerCase());
            addMessage(response, 'bot');
        }, 1000);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-3 ${sender === 'user' ? 'text-right' : ''}`;
        const messageBubble = document.createElement('div');
        messageBubble.className = `inline-block rounded-lg p-3 max-w-xs ${sender === 'user' ? 'bg-emirates-red text-white' : 'bg-gray-100 text-gray-800'}`;
        messageBubble.textContent = text;
        messageDiv.appendChild(messageBubble);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAutoResponse(message) {
        if (message.includes('flight') || message.includes('booking')) {
            return "You can manage your booking online using our 'Manage Booking' feature. Would you like me to direct you to that page?";
        } else if (message.includes('baggage') || message.includes('luggage')) {
            return "Our baggage allowance depends on your ticket class. Economy allows 30kg, Business 40kg, and First Class 50kg. Do you need more specific details?";
        } else if (message.includes('check-in') || message.includes('boarding pass')) {
            return "Online check-in opens 48 hours before departure. You can check in on our website or mobile app. Would you like me to send you a link?";
        } else if (message.includes('cancel') || message.includes('refund')) {
            return "Cancellation policies vary based on your fare type. Please provide your booking reference so I can check your specific options.";
        } else if (message.includes('change') || message.includes('modify')) {
            return "Flight changes may be subject to fees depending on your ticket type. Would you like to check availability for new dates?";
        } else if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
            return "Hello! Thanks for contacting Emirates support. How may I assist you with your travel today?";
        } else {
            return "Thank you for your message. For detailed assistance, our customer service team is available 24/7 at +1 (800) 777-3999 or you can email help@emirates.com.";
        }
    }
});


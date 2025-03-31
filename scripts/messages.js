// Set greeting based on time of day
const hour = new Date().getHours();
const greeting = document.getElementById('greeting');
greeting.textContent = (hour >= 18 || hour < 5) ? 'Bonsoir' : 'Bonjour';

// Show first message immediately
document.getElementById('message1').classList.add('visible');

let currentMessage = 1;
let totalMessages = 4; // Initial max message (before YES/NO choice)
let scrollLocked = false;

// Function to show next message
function showNextMessage() {
    if (scrollLocked || currentMessage >= totalMessages) return;

    // Lock scrolling for 0.5 seconds
    scrollLocked = true;
    setTimeout(() => {
        scrollLocked = false;
    }, 900);

    // Move all previous messages into the normal flow
    for (let i = 1; i <= currentMessage; i++) {
        const msg = document.getElementById('message' + i);
        msg.classList.add('moved');
        msg.style.position = 'relative';
        msg.style.transform = 'none';
    }

    // Ensure container reflows for proper positioning
    document.getElementById('messageContainer').style.display = 'flex';

    // Show next message
    currentMessage++;
    const newMsg = document.getElementById('message' + currentMessage);
    // Start the new message as absolutely positioned so it can animate in from the bottom
    newMsg.style.position = 'absolute';
    newMsg.style.bottom = '0';
    newMsg.classList.add('visible');

    // After the transition (0.5s), convert new message to relative positioning
    setTimeout(() => {
        newMsg.classList.add('moved');
        newMsg.style.position = 'relative';
        newMsg.style.transform = 'none';
    }, 100);
}

// Handle scrolling to reveal messages
window.addEventListener('wheel', function (e) {
    if (e.deltaY > 0) {
        showNextMessage();
    }
});

// Touch support for mobile
let touchStartY = 0;
window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchmove', function (e) {
    const touchY = e.touches[0].clientY;
    if (touchStartY > touchY) {
        // User swiped up
        showNextMessage();
        touchStartY = touchY;
    }
});

// YES/NO options
document.getElementById('yes').addEventListener('click', function () {
    // Hide NO option
    document.getElementById('no').classList.add('hidden');
    document.getElementById('message4').classList.add('selected');

    // Unlock more messages and show the next one
    totalMessages = 6;

    // Wait a moment before showing next message
    setTimeout(() => {
        // Move message4 into flow
        const msg4 = document.getElementById('message4');
        msg4.classList.add('moved');
        msg4.style.position = 'relative';
        msg4.style.transform = 'none';

        document.getElementById('message5').classList.remove('hidden');
        showNextMessage();

        // Setup for message 6
        setTimeout(() => {
            // Move message5 into flow
            const msg5 = document.getElementById('message5');
            msg5.classList.add('moved');
            msg5.style.position = 'relative';
            msg5.style.transform = 'none';

            document.getElementById('message6').classList.remove('hidden');
            showNextMessage();

            // Setup offline detection after showing message6
            window.addEventListener('offline', showOfflineScreen);
            window.addEventListener('online', checkIfStillOnline);

            // Also check current status
            if (!navigator.onLine) {
                showOfflineScreen();
            }
        }, 2000);
    }, 1000);
});

document.getElementById('no').addEventListener('click', function () {
    // Hide YES option
    document.getElementById('yes').classList.add('hidden');
    document.getElementById('message4').classList.add('selected');
    // Nothing else happens if NO is clicked, as per requirements
});

function showOfflineScreen() {
    setTimeout(() => {
        document.getElementById('offlineScreen').classList.add('visible');
        document.getElementById('messageContainer').classList.add('hidden');
        document.body.style.height = "auto";
        document.body.style.overflow = "visible";
    }, 1000);
}

// function checkIfStillOnline() {
//     // If user reconnects, hide the offline screen
//     document.getElementById('offlineScreen').classList.remove('visible');
// }
/**
 * Message system for intro sequence
 */
import { getElementById } from '../utils/domUtils.js';

/**
 * Initialize message system
 */
const initializeMessageSystem = () => {
  // Set greeting based on time of day
  const hour = new Date().getHours();
  const greeting = getElementById('greeting');
  
  if (greeting) {
    greeting.textContent = (hour >= 18 || hour < 5) ? 'Bonsoir' : 'Bonjour';
  }
  
  // State variables
  let currentMessage = 1;
  let totalMessages = 4; // Initial max message (before YES/NO choice)
  let scrollLocked = false;
  
  // Show first message immediately
  const firstMessage = getElementById('message1');
  if (firstMessage) {
    firstMessage.classList.add('visible');
  }
  
  /**
   * Check if device is mobile
   * @return {boolean} true if device is mobile
   */
  const isMobile = () => {
    return window.innerWidth <= 768;
  };
  
  /**
   * Show next message in sequence
   */
  const showNextMessage = () => {
    if (scrollLocked || currentMessage >= totalMessages) return;
    
    // Lock scrolling for 0.9 seconds
    scrollLocked = true;
    setTimeout(() => {
      scrollLocked = false;
    }, 900);
    
    // Move all previous messages into the normal flow
    for (let i = 1; i <= currentMessage; i++) {
      const msg = getElementById('message' + i);
      if (msg) {
        msg.classList.add('moved');
        msg.style.position = 'relative';
        msg.style.transform = 'none';
      }
    }
    
    // Ensure container reflows for proper positioning
    const messageContainer = getElementById('messageContainer');
    if (messageContainer) {
      messageContainer.style.display = 'flex';
    }
    
    // Show next message
    currentMessage++;
    const newMsg = getElementById('message' + currentMessage);
    if (newMsg) {
      // Start the new message as absolutely positioned so it can animate in from the bottom
      newMsg.style.position = 'absolute';
      newMsg.style.bottom = '0';
      newMsg.classList.add('visible');
      
      // After the transition, convert new message to relative positioning
      setTimeout(() => {
        newMsg.classList.add('moved');
        newMsg.style.position = 'relative';
        newMsg.style.transform = 'none';
        
        // On mobile, scroll to show the new message
        if (isMobile()) {
          newMsg.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 100);
    }
  };
  
  /**
   * Show offline screen
   */
  const showOfflineScreen = () => {
    setTimeout(() => {
      const offlineScreen = getElementById('offlineScreen');
      const messageContainer = getElementById('messageContainer');
      
      if (offlineScreen) {
        offlineScreen.classList.add('visible');
      }
      
      if (messageContainer) {
        messageContainer.classList.add('hidden');
      }
      
      document.body.style.height = "auto";
      document.body.style.overflow = "visible";
    }, 1000);
  };
  
  // Handle scrolling to reveal messages
  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      showNextMessage();
    }
  });
  
  // Touch support for mobile
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });
  
  window.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    if (touchStartY > touchY) {
      // User swiped up
      showNextMessage();
      touchStartY = touchY;
    }
  });
  
  // Setup YES/NO options
  const yesButton = getElementById('yes');
  const noButton = getElementById('no');
  
  if (yesButton) {
    yesButton.addEventListener('click', () => {
      // Hide NO option
      if (noButton) {
        noButton.classList.add('hidden');
      }
      
      const message4 = getElementById('message4');
      if (message4) {
        message4.classList.add('selected');
      }
      
      // Unlock more messages and show the next one
      totalMessages = 6;
      
      // Wait a moment before showing next message
      setTimeout(() => {
        // Move message4 into flow
        if (message4) {
          message4.classList.add('moved');
          message4.style.position = 'relative';
          message4.style.transform = 'none';
        }
        
        const message5 = getElementById('message5');
        if (message5) {
          message5.classList.remove('hidden');
        }
        
        showNextMessage();
        
        // Setup for message 6
        setTimeout(() => {
          // Move message5 into flow
          if (message5) {
            message5.classList.add('moved');
            message5.style.position = 'relative';
            message5.style.transform = 'none';
          }
          
          const message6 = getElementById('message6');
          if (message6) {
            message6.classList.remove('hidden');
          }
          
          showNextMessage();
          
          // Setup offline detection after showing message6
          window.addEventListener('offline', showOfflineScreen);
          
          // Also check current status
          if (!navigator.onLine) {
            showOfflineScreen();
          }
        }, 2000);
      }, 1000);
    });
  }
  
  if (noButton) {
    noButton.addEventListener('click', () => {
      // Hide YES option
      if (yesButton) {
        yesButton.classList.add('hidden');
      }
      
      const message4 = getElementById('message4');
      if (message4) {
        message4.classList.add('selected');
      }
      // Nothing else happens if NO is clicked, as per requirements
    });
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeMessageSystem);

export { initializeMessageSystem };
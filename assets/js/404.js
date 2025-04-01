/**
 * 404 page redirection script
 */
import { getElementById } from './utils/domUtils.js';

/**
 * Initialize 404 page functionality
 */
const initialize404Page = () => {
  let countdown = 5;
  const countdownElement = getElementById('countdown');
  
  if (!countdownElement) return;
  
  // Start countdown timer
  const timer = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;
    
    // Redirect when countdown reaches zero
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = '/';
    }
  }, 1000);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initialize404Page);

export { initialize404Page };
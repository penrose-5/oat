/**
 * Avatar name hover effects
 */
import { querySelector, querySelectorAll } from '../utils/domUtils.js';
import { animateTextChange } from '../utils/animationUtils.js';

/**
 * Initialize avatar name hover effects
 */
const initializeAvatarName = () => {
  const avatarNameElement = querySelector('.avatar-name');
  const rollingTextElements = querySelectorAll('.rolling-text');
  
  // Text content configurations
  const textConfigs = [
    {
      original: "on the renewables power market",
      hover: "with dev experience at EPFL"
    },
    {
      original: "currently based in Denmark",
      hover: "originally from Switzerland"
    }
  ];
  
  // Handle mouse enter event
  const handleMouseEnter = () => {
    textConfigs.forEach((config, index) => {
      const element = rollingTextElements[index];
      if (element) {
        animateTextChange(element, config.hover, { color: 'var(--blue)' });
      }
    });
    
    rollingTextElements.forEach(el => el.style.color = "var(--blue)");
  };
  
  // Handle mouse leave event
  const handleMouseLeave = () => {
    textConfigs.forEach((config, index) => {
      const element = rollingTextElements[index];
      if (element) {
        animateTextChange(element, config.original, { color: '' });
      }
    });
    
    rollingTextElements.forEach(el => el.style.color = "");
  };
  
  // Add event listeners
  if (avatarNameElement) {
    avatarNameElement.addEventListener('mouseenter', handleMouseEnter);
    avatarNameElement.addEventListener('mouseleave', handleMouseLeave);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAvatarName);

export { initializeAvatarName };

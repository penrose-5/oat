/**
 * Avatar image hover effect
 */
import { querySelector } from '../utils/domUtils.js';

/**
 * Initialize avatar image hover effect
 */
const initializeImageEffect = () => {
  const container = querySelector('.intro');
  const avatar = querySelector('.avatar');
  
  if (!container || !avatar) return;
  
  const maxMovement = 15;
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within container
    const y = e.clientY - rect.top;  // Y position within container
    
    // Calculate movement offset based on mouse position
    const moveX = ((x / rect.width) - 0.5) * (maxMovement * 2);
    const moveY = ((y / rect.height) - 0.5) * (maxMovement * 2);
    
    // Apply transform
    avatar.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };
  
  // Handle mouse leave to reset position
  const handleMouseLeave = () => {
    avatar.style.transform = 'translate(0, 0)';
    avatar.style.transition = 'transform 0.5s ease-out';
    
    // Remove transition after animation completes
    setTimeout(() => {
      avatar.style.transition = '';
    }, 500);
  };
  
  // Add event listeners
  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeImageEffect);

export { initializeImageEffect };
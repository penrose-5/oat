/**
 * Animation utility functions
 */

/**
 * Animate text change with a slide effect
 * @param {HTMLElement} element - The element to animate
 * @param {string} newText - The new text content
 * @param {Object} [options={}] - Animation options
 * @param {number} [options.duration=300] - Animation duration in ms
 * @param {string} [options.color=''] - Optional color to apply
 */
const animateTextChange = (element, newText, options = {}) => {
  const duration = options.duration || 300;
  
  // Slide out
  element.style.transform = "translateY(100%)";
  element.style.opacity = "0";

  // Update text and slide in
  setTimeout(() => {
    element.textContent = newText;
    
    if (options.color) {
      element.style.color = options.color;
    }
    
    element.style.transform = "translateY(0)";
    element.style.opacity = "1";
  }, duration);
};

/**
 * Smooth transition to target values
 * @param {Function} updateFn - Function to call on each animation frame
 * @param {number} [duration=null] - Optional animation duration in ms
 * @returns {Function} - Function to stop the animation
 */
const smoothAnimate = (updateFn, duration = null) => {
  let animationId;
  let startTime = null;
  
  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    
    // Calculate progress (0 to 1)
    const elapsed = timestamp - startTime;
    const progress = duration ? Math.min(elapsed / duration, 1) : null;
    
    // Call update with progress
    updateFn(progress);
    
    // Continue animation if duration not reached
    if (!duration || progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };
  
  // Start animation
  animationId = requestAnimationFrame(animate);
  
  // Return stop function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
};

export {
  animateTextChange,
  smoothAnimate
};
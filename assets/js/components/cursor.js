/**
 * Custom cursor component
 */
import { createElement } from '../utils/domUtils.js';

/**
 * Initialize custom cursor
 */
const initializeCursor = () => {
  // Create cursor elements
  const cursorDot = createElement('div', {
    styles: {
      position: 'fixed',
      width: '5px',
      height: '5px',
      background: 'var(--blue)',
      borderRadius: '50%',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.3s ease, height 0.3s ease',
      zIndex: '10000'
    }
  });

  const cursorCircle = createElement('div', {
    styles: {
      position: 'fixed',
      width: '50px',
      height: '50px',
      border: '1px solid var(--black)',
      borderRadius: '50%',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.3s ease, height 0.3s ease',
      zIndex: '9999'
    }
  });

  // Add to DOM
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorCircle);

  // Track mouse position
  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;

  // Update dot position instantly
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Smooth follow effect for the larger circle
  function animateCircle() {
    circleX += (mouseX - circleX) * 0.123;
    circleY += (mouseY - circleY) * 0.123;
    cursorCircle.style.left = `${circleX}px`;
    cursorCircle.style.top = `${circleY}px`;
    requestAnimationFrame(animateCircle);
  }
  
  // Start animation
  animateCircle();

  // Add interactive behavior for links
  document.querySelectorAll('.dashed').forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursorDot.style.background = 'var(--red)';
      cursorDot.style.width = '10px';
      cursorDot.style.height = '10px';
      cursorCircle.style.border = '1px dashed var(--black)';
      cursorCircle.style.width = '25px';
      cursorCircle.style.height = '25px';
    });
    
    link.addEventListener('mouseleave', () => {
      cursorDot.style.background = 'var(--blue)';
      cursorDot.style.width = '5px';
      cursorDot.style.height = '5px';
      cursorCircle.style.border = '1px solid var(--black)';
      cursorCircle.style.width = '50px';
      cursorCircle.style.height = '50px';
    });
  });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCursor);

export { initializeCursor };
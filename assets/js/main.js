/**
 * Main application entry point
 */

// Import components
import { initializeCursor } from './components/cursor.js';
import { initializeAvatarName } from './components/avatarName.js';
import { initializeImageEffect } from './components/imageEffect.js';
import { initializeMessageSystem } from './components/messageSystem.js';

/**
 * Initialize all application components
 */
const initializeApp = () => {
  // Initialize all components
  initializeCursor();
  initializeAvatarName();
  initializeImageEffect();
  initializeMessageSystem();
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
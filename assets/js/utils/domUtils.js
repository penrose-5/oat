/**
 * DOM utility functions
 */

/**
 * Get DOM element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} - The DOM element or null if not found
 */
const getElementById = (id) => document.getElementById(id);

/**
 * Get DOM elements by selector
 * @param {string} selector - CSS selector
 * @returns {NodeListOf<Element>} - List of matching elements
 */
const querySelectorAll = (selector) => document.querySelectorAll(selector);

/**
 * Get single DOM element by selector
 * @param {string} selector - CSS selector
 * @returns {Element|null} - First matching element or null
 */
const querySelector = (selector) => document.querySelector(selector);

/**
 * Add event listener to element
 * @param {HTMLElement} element - Target element
 * @param {string} eventType - Event type (e.g., 'click')
 * @param {Function} callback - Event handler
 */
const addEventListenerTo = (element, eventType, callback) => {
  if (element) {
    element.addEventListener(eventType, callback);
  }
};

/**
 * Create DOM element with specified attributes and styles
 * @param {string} tag - HTML tag name
 * @param {Object} [options={}] - Element options
 * @param {Object} [options.attributes={}] - Element attributes
 * @param {Object} [options.styles={}] - CSS styles
 * @param {string} [options.text=''] - Text content
 * @param {string} [options.html=''] - HTML content
 * @returns {HTMLElement} - Created element
 */
const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);
  
  // Set attributes
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  
  // Set styles
  if (options.styles) {
    Object.entries(options.styles).forEach(([prop, value]) => {
      element.style[prop] = value;
    });
  }
  
  // Set content
  if (options.text) {
    element.textContent = options.text;
  } else if (options.html) {
    element.innerHTML = options.html;
  }
  
  return element;
};

export {
  getElementById,
  querySelectorAll,
  querySelector,
  addEventListenerTo,
  createElement
};
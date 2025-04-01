/**
 * Responsive utility functions
 */

/**
 * Check if the device is mobile based on screen width
 * @param {number} [breakpoint=768] - The breakpoint to consider as mobile
 * @returns {boolean} - True if device is considered mobile
 */
const isMobile = (breakpoint = 768) => {
  return window.innerWidth <= breakpoint;
};

/**
 * Check if the device is a tablet based on screen width
 * @param {number} [minBreakpoint=768] - The minimum breakpoint for tablet
 * @param {number} [maxBreakpoint=1024] - The maximum breakpoint for tablet
 * @returns {boolean} - True if device is considered a tablet
 */
const isTablet = (minBreakpoint = 768, maxBreakpoint = 1024) => {
  return window.innerWidth > minBreakpoint && window.innerWidth <= maxBreakpoint;
};

/**
 * Check if the device is desktop based on screen width
 * @param {number} [breakpoint=1024] - The breakpoint above which is considered desktop
 * @returns {boolean} - True if device is considered desktop
 */
const isDesktop = (breakpoint = 1024) => {
  return window.innerWidth > breakpoint;
};

/**
 * Register callback to be called when device type changes
 * @param {Function} callback - Function to call when device type changes
 * @returns {Function} - Function to remove the event listener
 */
const onDeviceTypeChange = (callback) => {
  let prevWidth = window.innerWidth;
  
  const handleResize = () => {
    const currentWidth = window.innerWidth;
    
    // Check if we've crossed a breakpoint
    const wasMobile = prevWidth <= 768;
    const wasTablet = prevWidth > 768 && prevWidth <= 1024;
    const wasDesktop = prevWidth > 1024;
    
    const isMobileNow = currentWidth <= 768;
    const isTabletNow = currentWidth > 768 && currentWidth <= 1024;
    const isDesktopNow = currentWidth > 1024;
    
    // Call callback only if device type changed
    if (
      (wasMobile !== isMobileNow) ||
      (wasTablet !== isTabletNow) ||
      (wasDesktop !== isDesktopNow)
    ) {
      callback({
        isMobile: isMobileNow,
        isTablet: isTabletNow,
        isDesktop: isDesktopNow,
        width: currentWidth
      });
    }
    
    prevWidth = currentWidth;
  };
  
  window.addEventListener('resize', handleResize);
  
  // Return function to remove event listener
  return () => window.removeEventListener('resize', handleResize);
};

export {
  isMobile,
  isTablet,
  isDesktop,
  onDeviceTypeChange
};
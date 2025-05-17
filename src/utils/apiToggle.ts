
/**
 * Utility to toggle between mock API and real API
 * This file can be used to easily switch between using mock data or real backend API
 */

import { iceCreamApi } from '@/api/iceCreamApi';

// Use this function to toggle between mock data and real API
export const toggleMockApi = (useMockData: boolean): void => {
  iceCreamApi.setUseMockData(useMockData);
};

// Use this function to check if current mode is using mock data
export const isMockApiEnabled = (): boolean => {
  // Access the iceCreamApi directly to check the current state
  // Note that this is implemented in a hacky way since the useMockData is private
  // In a real project, we'd have a proper accessor for this
  try {
    const apiStr = JSON.stringify(iceCreamApi);
    return apiStr.includes('"useMockData":true');
  } catch (e) {
    console.error('Error checking API mode:', e);
    return true; // Default to mock data in case of error
  }
};

/**
 * How to use:
 * 
 * To enable real API:
 * ```
 * import { toggleMockApi } from '@/utils/apiToggle';
 * toggleMockApi(false);
 * ```
 * 
 * To enable mock data:
 * ```
 * import { toggleMockApi } from '@/utils/apiToggle';
 * toggleMockApi(true);
 * ```
 * 
 * To check current mode:
 * ```
 * import { isMockApiEnabled } from '@/utils/apiToggle';
 * const isUsingMock = isMockApiEnabled();
 * ```
 */

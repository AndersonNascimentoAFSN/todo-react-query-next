import '@testing-library/jest-dom/extend-expect'
// global.IS_REACT_ACT_ENVIRONMENT = true

// import { setupServer } from 'msw/node';
// import { handlers } from './src/__tests__/utils/utils';
// import { setLogger } from 'react-query';

// export const server = setupServer(...handlers);

// // Establish API mocking before all tests.
// beforeAll(() => server.listen());
// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
// afterEach(() => server.resetHandlers());
// // Clean up after the tests are finished.
// afterAll(() => server.close());

// silence react-query errors
// setLogger({
//     log: console.log,
//     warn: console.warn,
//     error: () => { },
// });
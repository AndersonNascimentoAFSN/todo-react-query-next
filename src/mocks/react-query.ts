export const MOCK_USE_QUERY_RESULT = {
  data: undefined,
  dataUpdatedAt: 0,
  error: null,
  errorUpdatedAt: 0,
  failureCount: 0,
  isError: false,
  isFetched: false,
  isFetchedAfterMount: false,
  isFetching: false,
  isIdle: false,
  isLoading: false,
  isLoadingError: false,
  isPlaceholderData: false,
  isPreviousData: false,
  isRefetchError: false,
  isRefetching: false,
  isStale: false,
  isSuccess: true,
  status: 'success',
  refetch: jest.fn(),
  remove: jest.fn(),
};

// useConfigMock({...MOCK_USE_QUERY_RESULT, isError: false, isSuccess: false});
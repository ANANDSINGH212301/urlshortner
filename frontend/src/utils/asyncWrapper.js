
import React from "react";
export const withAsyncHandler = (asyncFn, options = {}) => {
  const {
    onSuccess,
    onError,
    onFinally,
    rethrow = false
  } = options;

  return async (...args) => {
    try {
      const result = await asyncFn(...args);
      
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      // Process the error
      const processedError = error.isAxiosError 
        ? {
            message: error.response?.data?.message || error.message || 'An unexpected error occurred',
            status: error.response?.status,
            data: error.response?.data,
            originalError: error
          }
        : { 
            message: error.message || 'An unexpected error occurred', 
            originalError: error 
          };
      
      if (onError && typeof onError === 'function') {
        onError(processedError);
      }
      
      if (rethrow) {
        throw processedError;
      }
    } finally {
      if (onFinally && typeof onFinally === 'function') {
        onFinally();
      }
    }
  };
};

export const useAsync = (asyncFn, options = {}) => {
  const [state, setState] = React.useState({
    loading: false,
    error: null,
    data: null
  });

  const execute = React.useCallback(
    (...args) => {
      setState({ loading: true, error: null, data: null });
      
      return withAsyncHandler(
        asyncFn,
        {
          onSuccess: (result) => {
            setState({ loading: false, error: null, data: result });
            if (options.onSuccess) options.onSuccess(result);
          },
          onError: (err) => {
            setState({ loading: false, error: err, data: null });
            if (options.onError) options.onError(err);
          },
          rethrow: false
        }
      )(...args);
    },
    [asyncFn, options]
  );

  return { 
    execute, 
    ...state 
  };
};

export const createAsyncHandler = (defaultOptions = {}) => {
  return (asyncFn, options = {}) => {
    return withAsyncHandler(asyncFn, { ...defaultOptions, ...options });
  };
};
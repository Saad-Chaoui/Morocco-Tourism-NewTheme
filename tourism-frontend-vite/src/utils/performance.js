export const measurePerformance = (componentName) => {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      console.debug(`${componentName} render time: ${duration.toFixed(2)}ms`);
    };
  };
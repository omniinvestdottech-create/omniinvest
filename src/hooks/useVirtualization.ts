import { useState, useEffect, useMemo } from 'react';

interface VirtualizationOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function useVirtualization<T>(
  items: T[],
  options: VirtualizationOptions
) {
  const [scrollTop, setScrollTop] = useState(0);
  const { itemHeight, containerHeight, overscan = 5 } = options;

  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return {
      startIndex,
      endIndex,
      items: items.slice(startIndex, endIndex + 1),
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight,
    };
  }, [items, scrollTop, itemHeight, containerHeight, overscan]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return {
    ...visibleItems,
    handleScroll,
  };
}
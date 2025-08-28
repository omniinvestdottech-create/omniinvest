import { useEffect, useRef, useState } from 'react';

interface UseWebWorkerOptions {
  onMessage?: (data: any) => void;
  onError?: (error: ErrorEvent) => void;
}

export function useWebWorker(
  workerFunction: () => void,
  options: UseWebWorkerOptions = {}
) {
  const workerRef = useRef<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create worker from function
    const workerCode = `
      self.onmessage = function(e) {
        const { type, data } = e.data;
        
        // AI calculation functions
        const calculatePortfolioRisk = (holdings) => {
          // Complex risk calculations
          const correlationMatrix = holdings.map(h => 
            holdings.map(h2 => Math.random() * 2 - 1)
          );
          return {
            var: Math.random() * 0.3,
            beta: Math.random() * 2,
            sharpe: Math.random() * 3,
            correlations: correlationMatrix
          };
        };
        
        const predictPriceMovement = (symbol, data) => {
          // AI prediction simulation
          const confidence = Math.random() * 40 + 60;
          const direction = Math.random() > 0.5 ? 1 : -1;
          const magnitude = Math.random() * 0.2 + 0.05;
          
          return {
            symbol,
            prediction: direction * magnitude,
            confidence,
            timeframe: '2-4 weeks',
            reasoning: [
              'Insider accumulation pattern detected',
              'Technical indicators showing momentum',
              'Sentiment analysis trending positive'
            ]
          };
        };
        
        switch (type) {
          case 'CALCULATE_RISK':
            const riskResult = calculatePortfolioRisk(data);
            self.postMessage({ type: 'RISK_CALCULATED', data: riskResult });
            break;
            
          case 'PREDICT_PRICE':
            const prediction = predictPriceMovement(data.symbol, data);
            self.postMessage({ type: 'PREDICTION_READY', data: prediction });
            break;
            
          case 'ANALYZE_SENTIMENT':
            // Simulate complex sentiment analysis
            setTimeout(() => {
              self.postMessage({ 
                type: 'SENTIMENT_ANALYZED', 
                data: { 
                  sentiment: Math.random() * 100,
                  sources: Math.floor(Math.random() * 500) + 100,
                  confidence: Math.random() * 40 + 60
                }
              });
            }, 1000);
            break;
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = (event) => {
      setIsLoading(false);
      options.onMessage?.(event.data);
    };

    worker.onerror = (error) => {
      setIsLoading(false);
      setError(error.message);
      options.onError?.(error);
    };

    workerRef.current = worker;

    return () => {
      worker.terminate();
      URL.revokeObjectURL(blob);
    };
  }, []);

  const postMessage = (data: any) => {
    if (workerRef.current) {
      setIsLoading(true);
      setError(null);
      workerRef.current.postMessage(data);
    }
  };

  return { postMessage, isLoading, error };
}
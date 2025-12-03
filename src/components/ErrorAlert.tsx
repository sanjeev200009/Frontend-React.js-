import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Server, Wifi, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { checkApiHealth } from '@/services/api';

interface ErrorAlertProps {
  message: string;
  onRetry: () => void;
}

const ErrorAlert = ({ message, onRetry }: ErrorAlertProps) => {
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  const checkConnection = async () => {
    setIsCheckingConnection(true);
    setConnectionStatus(null);
    
    try {
      const isHealthy = await checkApiHealth();
      if (isHealthy) {
        setConnectionStatus('✅ Connection is working. Please try loading products again.');
      } else {
        setConnectionStatus('❌ Unable to connect to our servers. Please check your internet connection.');
      }
    } catch {
      setConnectionStatus('❌ Network connection issue detected. Please check your internet connection.');
    } finally {
      setIsCheckingConnection(false);
    }
  };

  const getErrorType = (message: string) => {
    if (message.includes('connect') || message.includes('network')) {
      return 'connection';
    } else if (message.includes('CORS') || message.includes('forbidden')) {
      return 'cors';
    } else if (message.includes('timeout')) {
      return 'timeout';
    } else if (message.includes('No products found')) {
      return 'empty';
    }
    return 'generic';
  };

  const getHelpfulTips = (errorType: string) => {
    switch (errorType) {
      case 'connection':
        return [
          '• Check your internet connection',
          '• Try refreshing the page',
          '• The server may be temporarily unavailable'
        ];
      case 'cors':
        return [
          '• This appears to be a technical issue',
          '• Please try refreshing the page',
          '• Contact support if the problem persists'
        ];
      case 'timeout':
        return [
          '• The request is taking longer than usual',
          '• Check your internet connection',
          '• Try again in a few moments'
        ];
      case 'empty':
        return [
          '• No products are currently available',
          '• New products may be added soon',
          '• Please check back later'
        ];
      default:
        return [
          '• Please try refreshing the page',
          '• Check your internet connection',
          '• Contact support if issues persist'
        ];
    }
  };

  const errorType = getErrorType(message);
  const tips = getHelpfulTips(errorType);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-8"
    >
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h3 className="mb-2 text-lg font-semibold text-destructive">
              Oops! We're having trouble loading products
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              We're experiencing some technical difficulties. Don't worry, we're working to fix this!
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-left bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2 text-blue-800">
                <Server className="h-4 w-4" />
                What you can try:
              </h4>
              <ul className="text-sm space-y-1 text-blue-700 ml-6">
                {tips.map((tip, index) => (
                  <li key={index} className="list-disc">{tip}</li>
                ))}
              </ul>
            </div>

            {connectionStatus && (
              <div className="text-sm p-3 bg-gray-50 rounded-lg border border-gray-200">
                <strong>Connection Status:</strong> {connectionStatus}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={onRetry} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              
              <Button 
                onClick={checkConnection} 
                variant="outline"
                disabled={isCheckingConnection}
                className="gap-2"
              >
                <Wifi className="h-4 w-4" />
                {isCheckingConnection ? 'Checking...' : 'Check Connection'}
              </Button>
            </div>
            
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                Still having issues? <a href="mailto:support@store.com" className="text-blue-600 hover:underline">Contact Support</a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ErrorAlert;
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastProps {
  id?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function Toast({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  action,
  onClose,
  showCloseButton = true
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'info':
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.3 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`toast ${getBorderColor()} max-w-sm w-full pointer-events-auto`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getIcon()}
              </div>
              
              <div className="ml-3 w-0 flex-1">
                {title && (
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {title}
                  </p>
                )}
                <p className={`text-sm text-gray-500 dark:text-gray-400 ${title ? 'mt-1' : ''}`}>
                  {message}
                </p>
                
                {action && (
                  <div className="mt-3">
                    <button
                      onClick={action.onClick}
                      className="btn-ghost !px-3 !py-1 text-xs"
                    >
                      {action.label}
                    </button>
                  </div>
                )}
              </div>
              
              {showCloseButton && (
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={handleClose}
                    className="inline-flex text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Progress bar for timed toasts */}
          {duration > 0 && (
            <motion.div
              className="h-1 bg-current opacity-30"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toast Container Component
interface ToastContainerProps {
  toasts: ToastProps[];
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export function ToastContainer({ 
  toasts, 
  onRemove, 
  position = 'bottom-right' 
}: ToastContainerProps) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'fixed top-4 right-4 z-50';
      case 'top-left':
        return 'fixed top-4 left-4 z-50';
      case 'bottom-right':
        return 'fixed bottom-4 right-4 z-50';
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-50';
      case 'top-center':
        return 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50';
      case 'bottom-center':
        return 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50';
      default:
        return 'fixed bottom-4 right-4 z-50';
    }
  };

  return (
    <div className={`${getPositionClasses()} flex flex-col space-y-2`}>
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id || index}
            {...toast}
            onClose={() => onRemove(toast.id || index.toString())}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAll = () => {
    setToasts([]);
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success: (message: string, options?: Partial<ToastProps>) =>
      addToast({ ...options, type: 'success', message }),
    error: (message: string, options?: Partial<ToastProps>) =>
      addToast({ ...options, type: 'error', message }),
    warning: (message: string, options?: Partial<ToastProps>) =>
      addToast({ ...options, type: 'warning', message }),
    info: (message: string, options?: Partial<ToastProps>) =>
      addToast({ ...options, type: 'info', message }),
  };
}

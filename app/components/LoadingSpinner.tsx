import { motion } from 'framer-motion';
import { Loader2, RefreshCw, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'spinner',
  color = 'primary',
  text,
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    primary: 'text-green-600 dark:text-green-400',
    secondary: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  if (variant === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <motion.div
          className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {text && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`mt-3 ${textSizes[size]} text-gray-600 dark:text-gray-400 font-medium`}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`rounded-full bg-current ${sizeClasses[size === 'xl' ? 'md' : size === 'lg' ? 'sm' : 'xs']} ${colorClasses[color]}`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        {text && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-3 ${textSizes[size]} text-gray-600 dark:text-gray-400 font-medium`}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <motion.div
          className={`rounded-full bg-current ${sizeClasses[size]} ${colorClasses[color]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {text && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-3 ${textSizes[size]} text-gray-600 dark:text-gray-400 font-medium`}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="flex space-x-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`bg-current ${colorClasses[color]} w-1 rounded-full`}
              style={{
                height: size === 'xs' ? '12px' : size === 'sm' ? '16px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : '40px'
              }}
              animate={{
                scaleY: [0.5, 1, 0.5],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {text && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-3 ${textSizes[size]} text-gray-600 dark:text-gray-400 font-medium`}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  return null;
}

export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-full"></div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
}

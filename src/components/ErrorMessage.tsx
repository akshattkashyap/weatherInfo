import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Alert variant="destructive" className="w-full max-w-lg mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-sm sm:text-base">{message}</AlertDescription>
    </Alert>
  );
};
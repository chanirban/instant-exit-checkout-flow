
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { CheckIcon } from 'lucide-react';

interface NotificationToastProps {
  title: string;
  description?: string;
  isSuccess?: boolean;
  duration?: number;
  show: boolean;
}

const NotificationToast = ({ 
  title, 
  description, 
  isSuccess = true, 
  duration = 3000,
  show
}: NotificationToastProps) => {
  useEffect(() => {
    if (show) {
      toast(title, {
        description: description,
        position: "top-center",
        icon: isSuccess ? <CheckIcon className="h-4 w-4 text-success" /> : null,
        duration: duration,
        className: "bg-card border border-border shadow-lg",
      });
    }
  }, [show, title, description, isSuccess, duration]);

  return null;
};

export default NotificationToast;

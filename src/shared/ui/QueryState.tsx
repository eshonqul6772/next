'use client';

import React from 'react';
import { notifications } from '@mantine/notifications';
import { Alert, Button } from '@mantine/core';
import { AlertTriangle } from 'lucide-react';

interface QueryErrorProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  showToast?: boolean;
}

export const QueryError: React.FC<QueryErrorProps> = ({
  title = 'Xatolik',
  message = 'Ma\'lumotni yuklashda xatolik yuz berdi',
  retryLabel = 'Qayta urinib ko\'rish',
  onRetry,
  showToast = true
}) => {
  const shownRef = React.useRef(false);

  React.useEffect(() => {
    if (!showToast || shownRef.current) return;
    shownRef.current = true;
    notifications.show({
      title,
      message,
      color: 'red'
    });
  }, [message, showToast, title]);

  return (
    <Alert icon={<AlertTriangle size={18} />} color="red" variant="light" radius="lg">
      <div className="flex flex-col gap-3">
        <div>
          <div className="font-semibold text-sm">{title}</div>
          <div className="text-sm text-gray-700">{message}</div>
        </div>
        {onRetry && (
          <div>
            <Button size="xs" color="red" variant="outline" onClick={onRetry}>
              {retryLabel}
            </Button>
          </div>
        )}
      </div>
    </Alert>
  );
};

interface QueryEmptyProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const QueryEmpty: React.FC<QueryEmptyProps> = ({
  title = 'Ma\'lumot topilmadi',
  description = 'Hozircha ma\'lumot mavjud emas',
  actionLabel,
  onAction
}) => (
  <div className="text-center py-20">
    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <AlertTriangle size={40} className="text-emerald-400" />
    </div>
    <div className="text-lg font-semibold text-gray-700 mb-2">{title}</div>
    <div className="text-gray-500 mb-6">{description}</div>
    {actionLabel && onAction && (
      <Button color="teal" radius="xl" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);

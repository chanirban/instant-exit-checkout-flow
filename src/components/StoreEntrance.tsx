
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import { useShopping } from '@/contexts/ShoppingContext';
import NotificationToast from './NotificationToast';
import { MapPinIcon } from 'lucide-react';

const StoreEntrance = () => {
  const { 
    store,
    isGeofenceActive, 
    isDeviceRegistered,
    isA2AAvailable
  } = useShopping();

  // Simulate the app detecting the store and showing welcome notification
  const showWelcomeToast = isGeofenceActive && store;

  return (
    <div className="space-y-4">
      <NotificationToast 
        title={`Welcome to ${store?.name}!`}
        description="This store supports A2A payments."
        show={showWelcomeToast}
      />
      
      <div className="space-y-2">
        <Card className="bg-card shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MapPinIcon className="mr-2 h-5 w-5 text-geofence" />
              {store?.name || 'No Store Detected'}
            </CardTitle>
            {store && (
              <p className="text-sm text-muted-foreground">{store.address}</p>
            )}
          </CardHeader>
          <CardContent className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm">Geofence Status:</span>
              <StatusBadge 
                status={isGeofenceActive} 
                label={isGeofenceActive ? "Inside Store" : "Outside Store"} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Device Registration:</span>
              <StatusBadge 
                status={isDeviceRegistered} 
                label={isDeviceRegistered ? "Registered" : "Not Registered"} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">A2A Payment:</span>
              <StatusBadge 
                status={isA2AAvailable} 
                label={isA2AAvailable ? "Available" : "Not Available"} 
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center p-4">
          <p className="text-lg font-medium">
            {isGeofenceActive 
              ? "You've entered the store" 
              : "Walk into a store to begin shopping"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {isGeofenceActive 
              ? "Feel free to browse and pick items" 
              : "The app will detect when you enter a supported store"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreEntrance;

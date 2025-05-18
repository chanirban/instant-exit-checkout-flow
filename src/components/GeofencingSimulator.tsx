
import React from 'react';
import { Button } from '@/components/ui/button';
import { useShopping } from '@/contexts/ShoppingContext';
import { ChevronRight } from 'lucide-react';

const GeofencingSimulator = () => {
  const { 
    appState, 
    setAppState, 
    setIsGeofenceActive, 
    setStore,
    clearCart,
    setPaymentComplete
  } = useShopping();

  const handleEnterStore = () => {
    setIsGeofenceActive(true);
    setAppState('entered');
    setStore({
      id: 'store1',
      name: 'TechMart',
      address: '123 Main Street'
    });

    // Reset cart and payment status when entering store
    clearCart();
    setPaymentComplete(false);
  };

  const handleStartShopping = () => {
    setAppState('shopping');
  };
  
  const handleApproachCheckout = () => {
    setAppState('checkout');
  };
  
  const handleExitStore = () => {
    setAppState('exited');
    setIsGeofenceActive(false);
  };
  
  const handleLeaveCompletely = () => {
    setAppState('outside');
    setStore(null);
    clearCart();
    setPaymentComplete(false);
  };

  const renderButtons = () => {
    switch(appState) {
      case 'outside':
        return (
          <Button 
            className="w-full" 
            onClick={handleEnterStore}
          >
            Enter Store <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        );
      
      case 'entered':
        return (
          <Button 
            className="w-full" 
            onClick={handleStartShopping}
          >
            Start Shopping <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        );
      
      case 'shopping':
        return (
          <Button 
            className="w-full" 
            onClick={handleApproachCheckout}
          >
            Approach Checkout <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        );
      
      case 'checkout':
        return (
          <Button 
            className="w-full" 
            onClick={handleExitStore}
          >
            Exit Store <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        );
      
      case 'exited':
        return (
          <Button 
            className="w-full" 
            onClick={handleLeaveCompletely}
          >
            Leave Completely <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
      <div className="text-center mb-2">
        <span className="text-xs uppercase font-medium text-muted-foreground">
          Geofencing Simulator
        </span>
      </div>
      <div className="flex gap-2">
        {renderButtons()}
      </div>
    </div>
  );
};

export default GeofencingSimulator;

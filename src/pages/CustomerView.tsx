
import React from 'react';
import { useShopping } from '@/contexts/ShoppingContext';
import StoreEntrance from '@/components/StoreEntrance';
import ItemScanner from '@/components/ItemScanner';
import Checkout from '@/components/Checkout';
import Receipt from '@/components/Receipt';
import GeofencingSimulator from '@/components/GeofencingSimulator';
import Cart from '@/components/Cart';

const CustomerView = () => {
  const { appState } = useShopping();
  
  const renderContent = () => {
    switch (appState) {
      case 'outside':
      case 'entered':
        return <StoreEntrance />;
      case 'shopping':
        return (
          <>
            <ItemScanner />
            {/* Show cart beneath scanner */}
            <div className="mt-4">
              <Cart />
            </div>
          </>
        );
      case 'checkout':
        return <Checkout />;
      case 'exited':
        return <Receipt />;
      default:
        return <StoreEntrance />;
    }
  };
  
  return (
    <div className="container max-w-md mx-auto p-4 pb-24">
      <div className="mb-4">
        <div className="flex justify-center items-center mb-2">
          {/* Updated PwC logo */}
          <img 
            src="/lovable-uploads/ca080a7b-6063-430c-9814-9473f5dfa883.png" 
            alt="PwC Logo" 
            className="h-12 w-auto" 
          />
        </div>
        <h1 className="text-2xl font-bold text-center">
          AdoptaPay
          <span className="ml-2 text-xs uppercase bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded">
            Customer
          </span>
        </h1>
      </div>
      
      {renderContent()}
      
      {/* Fixed simulator control at bottom of screen */}
      <GeofencingSimulator />
    </div>
  );
};

export default CustomerView;

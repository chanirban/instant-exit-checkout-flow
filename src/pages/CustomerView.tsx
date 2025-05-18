
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
        <h1 className="text-2xl font-bold text-center">
          Frictionless Checkout
          <span className="ml-2 text-xs uppercase bg-primary/10 text-primary px-2 py-0.5 rounded">
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

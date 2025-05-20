
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
          {/* PwC logo */}
          <svg width="40" height="40" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H140V140H0V0Z" fill="#E0301E"/>
            <path d="M35.8 85.4C37.4 85.4 38.7 84.1 38.7 82.5V45.3H51.5C52.7 45.3 54 43.7 54 41.9C54 40.2 52.7 38.6 51.5 38.6H20.1C18.9 38.6 17.6 40.2 17.6 41.9C17.6 43.7 18.9 45.3 20.1 45.3H32.9V82.5C32.9 84.1 34.2 85.4 35.8 85.4Z" fill="white"/>
            <path d="M75.9 85.4C77.3 85.4 78 84.8 78.6 83.8L98.7 50.7L98.8 50.6C99.6 49.2 99 47.3 97.4 46.4C96 45.5 94.1 45.9 93.3 47.3L93.2 47.4L75.9 76.2L58.6 47.4L58.5 47.3C57.7 45.9 55.8 45.5 54.4 46.4C52.8 47.3 52.2 49.2 53 50.6L53.1 50.7L73.2 83.8C73.7 84.8 74.5 85.4 75.9 85.4Z" fill="white"/>
            <path d="M120.3 85.4C121.8 85.4 122.7 84.7 123.5 83.4C124 82.6 124.1 81.5 123.4 80.5C122.1 78.3 118.8 79.9 118.3 75.5C118.2 74.8 118.1 73.8 118.1 72.8V51.4C118.1 43.6 112.6 38 105.1 38C97.8 38 92.3 43.1 92.3 50.4C92.3 53.1 94.3 55.1 97 55.1C99.8 55.1 101.6 52.9 101.6 50.6C101.6 47.3 103.4 44.9 106 44.9C108.8 44.9 110.5 47.1 110.5 50.6V55.7C104.1 58.6 97.2 62.6 97.2 71.8C97.2 78.5 101.7 85.4 111.2 85.4C114.2 85.4 116.7 84.1 118.6 82C118.9 84.3 120.3 85.4 121.8 85.4H120.3ZM110.5 78.9C106.3 78.9 104.3 75.9 104.3 71.8C104.3 66.6 107.9 63.6 110.5 62V78.9Z" fill="white"/>
          </svg>
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

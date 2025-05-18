
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for our store items
export type Item = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

// Types for our shopping cart
export type CartItem = Item & {
  quantity: number;
};

// Types for our user
export type User = {
  id: string;
  name: string;
  balance: number;
};

// Store location type
export type StoreLocation = {
  id: string;
  name: string;
  address: string;
};

// Customer in store type (for store dashboard)
export type CustomerInStore = {
  id: string;
  name: string;
  items: CartItem[];
  hasPaid: boolean;
};

// Possible app states
export type AppState = 'outside' | 'entered' | 'shopping' | 'checkout' | 'exited';

// Our context types
type ShoppingContextType = {
  user: User | null;
  store: StoreLocation | null;
  cart: CartItem[];
  appState: AppState;
  isGeofenceActive: boolean;
  isDeviceRegistered: boolean;
  isA2AAvailable: boolean;
  paymentMethod: 'A2A' | 'BNPL' | 'CBDC';
  paymentComplete: boolean;
  customers: CustomerInStore[];
  availableItems: Item[];
  
  // Methods
  setUser: (user: User | null) => void;
  setStore: (store: StoreLocation | null) => void;
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setAppState: (state: AppState) => void;
  setIsGeofenceActive: (status: boolean) => void;
  setIsDeviceRegistered: (status: boolean) => void;
  setIsA2AAvailable: (status: boolean) => void;
  setPaymentMethod: (method: 'A2A' | 'BNPL' | 'CBDC') => void;
  setPaymentComplete: (status: boolean) => void;
  completePayment: () => void;
  getCartTotal: () => number;
  addCustomer: (customer: CustomerInStore) => void;
  updateCustomerPaymentStatus: (customerId: string, status: boolean) => void;
};

// Create the context
const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

// Sample data
const sampleItems: Item[] = [
  { id: '1', name: 'Premium Headphones', price: 159.99, image: 'https://placehold.co/200x200?text=Headphones' },
  { id: '2', name: 'Smartphone Case', price: 29.99, image: 'https://placehold.co/200x200?text=Phone+Case' },
  { id: '3', name: 'Wireless Speaker', price: 79.99, image: 'https://placehold.co/200x200?text=Speaker' },
  { id: '4', name: 'Smart Watch', price: 199.99, image: 'https://placehold.co/200x200?text=Watch' },
];

// Provider component
export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: 'user1',
    name: 'John Doe',
    balance: 500.00
  });
  
  const [store, setStore] = useState<StoreLocation | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appState, setAppState] = useState<AppState>('outside');
  const [isGeofenceActive, setIsGeofenceActive] = useState(false);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(true);
  const [isA2AAvailable, setIsA2AAvailable] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'A2A' | 'BNPL' | 'CBDC'>('A2A');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [customers, setCustomers] = useState<CustomerInStore[]>([]);
  const [availableItems, setAvailableItems] = useState<Item[]>(sampleItems);

  // Add item to cart
  const addToCart = (item: Item) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return currentCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...currentCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(currentCart => 
      currentCart.filter(item => item.id !== itemId)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Complete payment
  const completePayment = () => {
    setPaymentComplete(true);
    
    // Add the current user to the store dashboard
    if (user) {
      addCustomer({
        id: user.id,
        name: user.name,
        items: [...cart],
        hasPaid: true
      });
    }
  };

  // Add customer to store dashboard
  const addCustomer = (customer: CustomerInStore) => {
    setCustomers(current => {
      const existingCustomer = current.find(c => c.id === customer.id);
      if (existingCustomer) {
        return current.map(c => 
          c.id === customer.id ? customer : c
        );
      } else {
        return [...current, customer];
      }
    });
  };

  // Update customer payment status
  const updateCustomerPaymentStatus = (customerId: string, status: boolean) => {
    setCustomers(current => 
      current.map(customer => 
        customer.id === customerId 
          ? { ...customer, hasPaid: status } 
          : customer
      )
    );
  };

  const value = {
    user,
    store,
    cart,
    appState,
    isGeofenceActive,
    isDeviceRegistered,
    isA2AAvailable,
    paymentMethod,
    paymentComplete,
    customers,
    availableItems,
    
    setUser,
    setStore,
    addToCart,
    removeFromCart,
    clearCart,
    setAppState,
    setIsGeofenceActive,
    setIsDeviceRegistered,
    setIsA2AAvailable,
    setPaymentMethod,
    setPaymentComplete,
    completePayment,
    getCartTotal,
    addCustomer,
    updateCustomerPaymentStatus,
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};

// Custom hook to use the context
export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};

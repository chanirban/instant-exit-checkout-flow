
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useShopping } from '@/contexts/ShoppingContext';
import { TrashIcon, MinusIcon } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal } = useShopping();
  
  if (cart.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="text-sm text-muted-foreground mt-1">
          Scan items to add them to your cart
        </p>
      </div>
    );
  }
  
  return (
    <Card className="bg-card shadow-md">
      <CardHeader>
        <CardTitle>Your Cart ({cart.length} items)</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {cart.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between border-b border-border pb-2"
          >
            <div className="flex items-center space-x-2">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">
                x{item.quantity}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeFromCart(item.id)}
                className="h-8 w-8 rounded-full"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-3">
        <div className="flex w-full justify-between py-2 border-t border-border">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${getCartTotal().toFixed(2)}</span>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            cart.forEach(item => removeFromCart(item.id));
          }}
        >
          <TrashIcon className="mr-2 h-4 w-4" />
          Clear Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;


import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useShopping } from '@/contexts/ShoppingContext';
import { CheckCircleIcon, TicketIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Receipt = () => {
  const { cart, getCartTotal, paymentComplete, store, paymentMethod } = useShopping();
  
  if (!paymentComplete) {
    return (
      <div className="text-center p-6">
        <p className="text-lg font-medium">No payment completed</p>
        <p className="text-sm text-muted-foreground mt-1">
          Complete your payment to see your receipt
        </p>
      </div>
    );
  }
  
  const today = new Date();
  const receiptNumber = `REC-${Math.floor(Math.random() * 1000000)}`;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="bg-success/20 text-success px-4 py-2 rounded-full flex items-center">
          <CheckCircleIcon className="mr-2 h-5 w-5" />
          <span className="font-medium">Payment Successful</span>
        </div>
      </div>
      
      <Card className="bg-card shadow-md">
        <CardHeader className="text-center border-b border-border">
          <div className="flex justify-center mb-2">
            <TicketIcon className="h-8 w-8" />
          </div>
          <CardTitle>Digital Receipt</CardTitle>
          <p className="text-sm text-muted-foreground">
            {store?.name} • {today.toLocaleDateString()}
          </p>
        </CardHeader>
        
        <CardContent className="pt-4 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Receipt #:</span>
              <span>{receiptNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date:</span>
              <span>{today.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method:</span>
              <span>{paymentMethod}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax:</span>
              <span>${(getCartTotal() * 0.07).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-base">
              <span>Total:</span>
              <span>${(getCartTotal() * 1.07).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center pt-4">
            <div className="border border-border rounded-md p-4 mb-2">
              <div className="text-4xl font-bold">QR</div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Show this receipt to associate if requested
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="justify-center border-t border-border pt-4">
          <Button variant="ghost" size="sm">
            Download Receipt
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Receipt;

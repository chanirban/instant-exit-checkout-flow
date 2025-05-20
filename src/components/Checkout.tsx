
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useShopping } from '@/contexts/ShoppingContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CircleDollarSignIcon, ShieldCheckIcon } from 'lucide-react';
import Cart from './Cart';

const Checkout = () => {
  const { 
    cart, 
    getCartTotal, 
    paymentMethod, 
    setPaymentMethod,
    completePayment,
    paymentComplete
  } = useShopping();
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleApprovePayment = () => {
    if (cart.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      completePayment();
      setIsProcessing(false);
    }, 2000);
  };

  // Calculate the total after discount
  const subtotal = getCartTotal();
  const discount = subtotal * 0.1; // 10% discount
  const total = subtotal - discount;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center bg-geofence/10 rounded-md py-3 mb-4">
        <ShieldCheckIcon className="mr-2 h-5 w-5 text-geofence" />
        <span className="font-medium text-sm">
          Approaching store exit - Preparing checkout
        </span>
      </div>
      
      <Cart />
      
      {cart.length > 0 && (
        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          
          <CardContent>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={(value) => setPaymentMethod(value as 'A2A' | 'BNPL' | 'CBDC')}
              className="grid grid-cols-1 gap-2"
            >
              <div className="flex items-center space-x-2 border border-primary/20 rounded-md p-3 bg-primary/5">
                <RadioGroupItem value="A2A" id="checkout-a2a" className="border-primary" />
                <div className="flex-1">
                  <Label htmlFor="checkout-a2a" className="font-medium text-base">A2A Payment</Label>
                  <p className="text-xs text-muted-foreground">
                    Direct account-to-account transfer (Recommended)
                  </p>
                </div>
                <CircleDollarSignIcon className="h-5 w-5 text-primary" />
              </div>
              
              <div className="flex items-center space-x-2 border border-border rounded-md p-3">
                <RadioGroupItem value="BNPL" id="checkout-bnpl" />
                <div className="flex-1">
                  <Label htmlFor="checkout-bnpl" className="font-medium">Buy Now, Pay Later</Label>
                  <p className="text-xs text-muted-foreground">
                    Split your payment into installments
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 border border-border rounded-md p-3">
                <RadioGroupItem value="CBDC" id="checkout-cbdc" />
                <div className="flex-1">
                  <Label htmlFor="checkout-cbdc" className="font-medium">CBDC</Label>
                  <p className="text-xs text-muted-foreground">
                    Pay with Central Bank Digital Currency
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={handleApprovePayment}
              className="w-full"
              disabled={isProcessing || paymentComplete || cart.length === 0}
            >
              {isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  Processing...
                </>
              ) : paymentComplete ? (
                "Payment Approved"
              ) : (
                `Approve Payment (£${total.toFixed(2)})`
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Checkout;

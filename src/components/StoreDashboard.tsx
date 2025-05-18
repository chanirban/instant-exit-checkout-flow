
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useShopping } from '@/contexts/ShoppingContext';
import { Separator } from '@/components/ui/separator';
import { UserIcon, ShoppingBagIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';

const StoreDashboard = () => {
  const { customers, store } = useShopping();
  
  const customersInStore = customers.length;
  const customersPaid = customers.filter(c => c.hasPaid).length;
  
  return (
    <div className="space-y-4">
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingBagIcon className="mr-2 h-5 w-5" />
            Store Dashboard
            {store && <span className="ml-2 text-sm text-muted-foreground">({store.name})</span>}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{customersInStore}</div>
              <div className="text-sm text-muted-foreground">Customers In Store</div>
            </div>
            
            <div className="bg-success/10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-success">{customersPaid}</div>
              <div className="text-sm text-muted-foreground">Payments Complete</div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Customer Activity:</h3>
            
            {customers.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  No customers in store
                </p>
              </div>
            ) : (
              customers.map((customer) => (
                <Card key={customer.id} className="border border-border bg-card/50">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2" />
                        <span className="font-medium">{customer.name}</span>
                      </div>
                      <StatusBadge 
                        status={customer.hasPaid} 
                        label={customer.hasPaid ? "Paid" : "Unpaid"} 
                      />
                    </div>
                    
                    {customer.items.length > 0 && (
                      <div className="bg-background rounded-md p-2 mt-2 text-sm">
                        <div className="text-xs text-muted-foreground mb-1">Items:</div>
                        {customer.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <Separator className="my-1" />
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>
                            ${customer.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreDashboard;

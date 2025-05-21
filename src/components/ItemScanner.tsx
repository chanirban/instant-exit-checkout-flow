
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Item, useShopping } from '@/contexts/ShoppingContext';
import StatusBadge from './StatusBadge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PlusIcon, ScanIcon, PoundSterlingIcon } from 'lucide-react';

const ItemScanner = () => {
  const { user, store, availableItems, addToCart, paymentMethod, setPaymentMethod } = useShopping();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isScanningMode, setIsScanningMode] = useState(false);
  
  const startScanning = () => {
    setIsScanningMode(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanningMode(false);
      // Randomly select an item
      const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
      setSelectedItem(randomItem);
    }, 2000);
  };
  
  const hasSufficientFunds = (): boolean => {
    if (!user || !selectedItem) return false;
    return user.balance >= selectedItem.price;
  };
  
  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem);
      setSelectedItem(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Personalized welcome message with discount */}
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-md border border-maroon-200 mb-4 content-container">
        <h3 className="font-medium">Hello Sarah!</h3>
        <p className="text-sm">Welcome to {store?.name || 'the store'}. By using AdoptaPay today you have unlocked <span className="font-bold text-maroon-600">10% off</span>.</p>
      </div>

      {!selectedItem && !isScanningMode && (
        <div className="flex flex-col items-center justify-center py-8 bg-white/90 backdrop-blur-sm rounded-lg content-container">
          <Button 
            onClick={startScanning}
            size="lg"
            variant="outline"
            className="h-20 w-20 rounded-full flex items-center justify-center mb-4 border-maroon-500 text-maroon-500 hover:bg-maroon-50"
          >
            <ScanIcon className="h-8 w-8" />
          </Button>
          <p className="text-lg font-medium">Scan an Item Smart Label</p>
          <p className="text-sm text-muted-foreground mt-1">
            Point your camera at an item smart label
          </p>
        </div>
      )}
      
      {isScanningMode && (
        <div className="flex flex-col items-center justify-center py-12 bg-white/90 backdrop-blur-sm rounded-lg content-container">
          <div className="w-64 h-64 border-4 border-maroon-500/20 rounded-lg relative flex items-center justify-center mb-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-maroon-500 animate-pulse-fade"></div>
          </div>
          <p className="text-lg font-medium">Scanning...</p>
        </div>
      )}
      
      {selectedItem && (
        <Card className="bg-card shadow-md content-container">
          <CardHeader>
            <CardTitle>{selectedItem.name}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {selectedItem.image && (
              <div className="flex justify-center">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  className="w-32 h-32 object-cover rounded-md" 
                />
              </div>
            )}
            
            <div className="bg-muted/50 rounded-md p-3 flex justify-between items-center">
              <span className="font-medium">Price:</span>
              <span className="text-lg font-semibold">£{selectedItem.price.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Funds:</span>
              <StatusBadge 
                status={hasSufficientFunds()} 
                label={hasSufficientFunds() ? "Sufficient" : "Insufficient"} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <PoundSterlingIcon className="h-5 w-5 mr-2 text-maroon-500" />
                <span className="font-medium">Payment Method:</span>
              </div>
              
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={(value) => setPaymentMethod(value as 'A2A' | 'BNPL' | 'CBDC')}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="A2A" id="a2a" />
                  <Label htmlFor="a2a">A2A</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BNPL" id="bnpl" />
                  <Label htmlFor="bnpl">BNPL</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="CBDC" id="cbdc" />
                  <Label htmlFor="cbdc">CBDC</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={handleAddToCart} 
              className="w-full bg-maroon-500 hover:bg-maroon-600"
              disabled={!hasSufficientFunds()}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ItemScanner;

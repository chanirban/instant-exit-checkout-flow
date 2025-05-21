
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { UserIcon, Users } from 'lucide-react';
import { ShoppingProvider } from '@/contexts/ShoppingContext';

const Index = () => {
  return (
    <ShoppingProvider>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center justify-center p-4">
        <div className="mb-6">
          {/* Updated PwC logo */}
          <img 
            src="/lovable-uploads/ca080a7b-6063-430c-9814-9473f5dfa883.png" 
            alt="PwC Logo" 
            className="h-16 w-auto" 
          />
        </div>
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-orange-600">
              AdoptaPay Demo
            </h1>
            <p className="mt-2 text-gray-600">
              Experience the future of retail with geofencing and AdoptaPay
            </p>
          </div>
          
          <div className="grid gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Customer Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Walk through the seamless shopping experience from store entry to checkout.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/customer" className="w-full">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Customer View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Store Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See the staff perspective with real-time customer tracking and payment status.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/staff" className="w-full">
                  <Button variant="outline" className="w-full border-orange-500 text-orange-600 hover:bg-orange-50">
                    <Users className="mr-2 h-4 w-4" />
                    Staff View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              This demo showcases geofencing, AdoptaPay, and frictionless checkout technology
            </p>
          </div>
        </div>
      </div>
    </ShoppingProvider>
  );
};

export default Index;


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
          {/* PwC logo */}
          <svg width="80" height="80" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H140V140H0V0Z" fill="#E0301E"/>
            <path d="M35.8 85.4C37.4 85.4 38.7 84.1 38.7 82.5V45.3H51.5C52.7 45.3 54 43.7 54 41.9C54 40.2 52.7 38.6 51.5 38.6H20.1C18.9 38.6 17.6 40.2 17.6 41.9C17.6 43.7 18.9 45.3 20.1 45.3H32.9V82.5C32.9 84.1 34.2 85.4 35.8 85.4Z" fill="white"/>
            <path d="M75.9 85.4C77.3 85.4 78 84.8 78.6 83.8L98.7 50.7L98.8 50.6C99.6 49.2 99 47.3 97.4 46.4C96 45.5 94.1 45.9 93.3 47.3L93.2 47.4L75.9 76.2L58.6 47.4L58.5 47.3C57.7 45.9 55.8 45.5 54.4 46.4C52.8 47.3 52.2 49.2 53 50.6L53.1 50.7L73.2 83.8C73.7 84.8 74.5 85.4 75.9 85.4Z" fill="white"/>
            <path d="M120.3 85.4C121.8 85.4 122.7 84.7 123.5 83.4C124 82.6 124.1 81.5 123.4 80.5C122.1 78.3 118.8 79.9 118.3 75.5C118.2 74.8 118.1 73.8 118.1 72.8V51.4C118.1 43.6 112.6 38 105.1 38C97.8 38 92.3 43.1 92.3 50.4C92.3 53.1 94.3 55.1 97 55.1C99.8 55.1 101.6 52.9 101.6 50.6C101.6 47.3 103.4 44.9 106 44.9C108.8 44.9 110.5 47.1 110.5 50.6V55.7C104.1 58.6 97.2 62.6 97.2 71.8C97.2 78.5 101.7 85.4 111.2 85.4C114.2 85.4 116.7 84.1 118.6 82C118.9 84.3 120.3 85.4 121.8 85.4H120.3ZM110.5 78.9C106.3 78.9 104.3 75.9 104.3 71.8C104.3 66.6 107.9 63.6 110.5 62V78.9Z" fill="white"/>
          </svg>
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

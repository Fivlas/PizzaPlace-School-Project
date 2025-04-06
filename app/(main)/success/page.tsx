"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { updateOrderStatus } from '@/actions/updateOrderStatus';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    const updateOrder = async () => {
      if (sessionId) {
        try {
          await updateOrderStatus(sessionId);
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      }
    }
    updateOrder();
  }, [sessionId]);

  if (!sessionId) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>No payment session found</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push('/')} className="w-full cursor-pointer">
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Your order has been confirmed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm font-medium">Order Reference:</p>
            <p className="text-xs text-muted-foreground break-all">{sessionId}</p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            A confirmation email has been sent to your email address.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push('/')} className="w-full cursor-pointer">
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPage;
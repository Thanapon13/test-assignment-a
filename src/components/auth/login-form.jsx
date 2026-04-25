"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCookie } from "@/utils/cookie-utils";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

export function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const token = getCookie();
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isRegister ? "Create an account" : "Admin Login"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {isRegister ? (
              <SignUpForm onSignIn={() => setIsRegister(false)} />
            ) : (
              <SignInForm onSignUp={() => setIsRegister(true)} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

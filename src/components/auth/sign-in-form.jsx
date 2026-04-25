"use client";

import { useState, useActionState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FieldError } from "./field-error";
import { loginUser } from "@/app/auth/action";
import { FormSubmitButton } from "../button/form-submit-button";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const defaultFormData = {
  email: "",
  password: "",
};

export function SignInForm({ onSignUp }) {
  const router = useRouter();
  const { login } = useAuth();
  const [message, formAction] = useActionState(loginUser, null);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (message?.code === 0 && message?.token) {
      login(message.token);
      router.push("/dashboard");
    }
  }, [message]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            placeholder="m@example.com"
            required
          />
          <FieldError message={message?.errors?.email} />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="pr-10"
              onChange={handleChange}
              value={formData.password}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          <FieldError message={message?.errors?.password} />
        </Field>

        <Field>
          <FormSubmitButton className="w-full">Login</FormSubmitButton>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSignUp}
              className="underline cursor-pointer"
            >
              Sign up
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

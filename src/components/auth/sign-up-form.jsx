"use client";

import { useState, useActionState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/app/auth/action";
import { FieldError } from "./field-error";
import { FormSubmitButton } from "../button/form-submit-button";
import { RegisterSuccess } from "./register-success";

const defaultFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignUpForm({ onSignIn }) {
  const [message, formAction] = useActionState(registerUser, null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (message?.code === 0) {
      setShowSuccess(true);
    }
  }, [message]);

  return (
    <>
      {/* form register */}
      <form action={formAction}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              type="text"
              placeholder="John Doe"
              required
            />
            <FieldError message={message?.errors?.name} />
          </Field>

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
                onChange={handleChange}
                value={formData.password}
                type={showPassword ? "text" : "password"}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
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
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            <FieldError message={message?.errors?.confirmPassword} />
          </Field>

          <Field>
            <FormSubmitButton className="w-full">Register</FormSubmitButton>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSignIn}
                className="underline cursor-pointer"
              >
                Sign in
              </button>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>

      {/* popup success register */}
      <RegisterSuccess
        open={showSuccess}
        onGoToSignIn={() => {
          setShowSuccess(false);
          onSignIn();
        }}
      />
    </>
  );
}

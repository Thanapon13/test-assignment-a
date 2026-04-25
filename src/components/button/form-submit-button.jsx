"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function FormSubmitButton({ children, className, disabled }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={className} disabled={pending || disabled}>
      {pending && <Spinner />}
      {children}
    </Button>
  );
}

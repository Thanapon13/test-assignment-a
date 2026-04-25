"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

const SubmitButton = ({ onCancel, isEditing, isClosing }) => {
  const { pending } = useFormStatus();

  return (
    <DialogFooter>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={pending || isClosing}
      >
        Cancel
      </Button>

      <Button type="submit" disabled={pending || isClosing}>
        {pending && <Spinner />}
        {isEditing ? "Save Changes" : "Create Post"}
      </Button>
    </DialogFooter>
  );
};

export default SubmitButton;

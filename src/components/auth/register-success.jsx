import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function RegisterSuccess({ open, onGoToSignIn }) {
  return (
    <Dialog open={open} onOpenChange={onGoToSignIn}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Register successful!</DialogTitle>
          <DialogDescription>
            Your account has been created. Please sign in to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full" onClick={onGoToSignIn}>
            Go to Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

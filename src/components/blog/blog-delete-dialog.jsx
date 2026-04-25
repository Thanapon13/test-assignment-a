// blog-delete-dialog.jsx
"use client";

import { useActionState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { handleDeleteBlogByAdmin } from "@/app/blog/actions";

const BlogDeleteDialog = ({ open, onOpenChange, blog, authenticateUser }) => {
  const [message, formAction] = useActionState(handleDeleteBlogByAdmin, null);

  useEffect(() => {
    if (message?.code === 0) {
      onOpenChange(false);
    }
  }, [message, onOpenChange]);

  if (!blog) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
          <AlertDialogDescription>
            คุณต้องการลบบล็อก{" "}
            <span className="font-semibold text-foreground">
              "{blog.title}"
            </span>{" "}
            ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <form action={formAction}>
            <input type="hidden" name="id" value={blog.id} />
            <input type="hidden" name="admin_id" value={authenticateUser?.id} />
            <AlertDialogAction
              type="submit"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              ลบ
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BlogDeleteDialog;

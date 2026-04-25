"use client";

import { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addComment } from "@/app/blog/actions";
import { FormSubmitButton } from "../button/form-submit-button";
import { FieldError } from "../../components/auth/field-error";

const CommentForm = ({ blogId }) => {
  const [form, setForm] = useState({
    sender_name: "",
    message: "",
    blog_id: blogId,
  });

  const [message, formAction] = useActionState(addComment, null);
  console.log("message", message);

  useEffect(() => {
    if (message?.code === 0) {
      setForm({
        sender_name: "",
        message: "",
        blog_id: blogId,
      });
    }
  }, [message, blogId]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  return (
    <form action={formAction} className="flex flex-col gap-3 border-t p-4">
      <p className="text-sm font-semibold">Write a comment</p>

      <Input name="blog_id" type="hidden" value={form.blog_id} />

      <div className="flex flex-col gap-1">
        <Input
          placeholder="name"
          name="sender_name"
          value={form.sender_name}
          className="border-2 border-gray-300 focus:border-blue-500 focus:ring-0 p-2 rounded-md"
          onChange={e => handleChange("sender_name", e.target.value)}
        />

        <FieldError message={message?.errors?.sender_name} />
      </div>

      <div className="flex flex-col gap-1">
        <Textarea
          placeholder="comment"
          name="message"
          rows={3}
          value={form.message}
          onChange={e => handleChange("message", e.target.value)}
        />
        <FieldError message={message?.errors?.message} />
      </div>

      <FormSubmitButton className="w-full">Send</FormSubmitButton>
    </form>
  );
};

export default CommentForm;

"use client";

import { useState, useActionState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageGalleryUpload } from "./image-gallery-upload";
import { createBlog, editBlogByAdmin } from "@/app/blog/actions";
import SubmitButton from "../button/submitButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const defaultFormData = {
  title: "",
  content: "",
  excerpt: "",
  sender_name: "",
  status: "unpublished",
  selectedImageIds: [],
};

const BlogForm = ({ open, onOpenChange, blog, authenticateUser }) => {
  const isEditing = !!blog;

  const [isClosing, setIsClosing] = useState(false);
  const [blogImages, setBlogImages] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);

  const [createMessage, createAction] = useActionState(createBlog, null);
  const [editMessage, editAction] = useActionState(editBlogByAdmin, null);

  const message = isEditing ? editMessage : createMessage;
  const formAction = isEditing ? editAction : createAction;

  useEffect(() => {
    if (blog) {
      const formattedImages =
        blog.images?.map(img => ({
          id: img.id,
          url: img.url,
          file: null,
          alt: "Blog image",
        })) || [];

      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        excerpt: blog.excerpt || "",
        sender_name: blog.sender_name || "",
        status: blog.status || "unpublished",
        selectedImageIds: blog.images?.map(img => img.id) || [],
      });

      setBlogImages(formattedImages);
    } else {
      setFormData(defaultFormData);
      setBlogImages([]);
    }
  }, [blog, open]);

  useEffect(() => {
    if (message?.code === 0) {
      setIsClosing(true);

      const timer = setTimeout(() => {
        onOpenChange(false);
        setIsClosing(false);

        setFormData(defaultFormData);
        setBlogImages([]);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [message, onOpenChange]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Make changes to your blog post below."
              : "Fill in the details to create a new blog post."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-6">
          {isEditing && (
            <>
              <input type="hidden" name="id" value={blog.id} />
              <input
                type="hidden"
                name="admin_id"
                value={authenticateUser.id}
              />
              <input
                type="hidden"
                name="admin_type"
                value={authenticateUser.type}
              />
            </>
          )}

          <input type="hidden" name="status" value={formData.status} />
          <input
            type="hidden"
            name="selectedImageIds"
            value={JSON.stringify(formData.selectedImageIds)}
          />

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="sender_name">Author Name</FieldLabel>
              <Input
                id="sender_name"
                name="sender_name"
                value={formData.sender_name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </Field>

            {authenticateUser && (
              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select
                  value={formData.status}
                  onValueChange={value =>
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unpublished">Unpublished</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
              <FieldContent>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief summary..."
                  rows={2}
                  required
                />
                <FieldDescription>
                  A short summary displayed in blog listings
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write content..."
                rows={6}
                required
              />
            </Field>

            <Field>
              <FieldContent>
                <ImageGalleryUpload
                  images={blogImages}
                  onChange={imgs => {
                    setBlogImages(imgs);
                    setFormData(prev => ({
                      ...prev,
                      selectedImageIds: imgs.map(img => img.id),
                    }));
                  }}
                />
                <FieldDescription>
                  Upload images for this blog post
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>

          <SubmitButton
            onCancel={() => onOpenChange(false)}
            isEditing={isEditing}
            isClosing={isClosing}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogForm;

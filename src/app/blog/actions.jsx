"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/utils/cloudinary";
import validateComment from "@/validators/validate-comment";
import { revalidatePath } from "next/cache";

const fileToBase64 = async file => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
};

// create blog
export const createBlog = async (prevState, formData) => {
  try {
    const rawData = Object.fromEntries(formData);

    const imageFiles = Object.entries(rawData)
      .filter(([key]) => key.startsWith("images["))
      .map(([, file]) => file);

    // generate slug
    const baseSlug = rawData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // เช็คว่า slug ซ้ำไหม
    const existing = await prisma.blog.findUnique({
      where: { slug: baseSlug },
    });
    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    // 1. create Blog
    const blog = await prisma.blog.create({
      data: {
        title: rawData.title,
        slug,
        content: rawData.content,
        excerpt: rawData.excerpt,
        sender_name: rawData.sender_name,
        status: "unpublished",
        view_count: 0,
      },
    });

    // 2. upload to Cloudinary
    if (imageFiles.length > 0) {
      const urls = await Promise.all(
        imageFiles.map(async file => {
          const base64 = await fileToBase64(file);
          return uploadImage(base64);
        }),
      );

      // 3. create BlogImage
      await prisma.blogImage.createMany({
        data: urls.map((url, index) => ({
          blog_id: blog.id,
          url,
          order: index,
        })),
      });
    }

    revalidatePath("/");
    return { code: 0, message: "Create blog successfully!!!" };
  } catch (error) {
    console.error("createBlog error:", error);
    return { code: 1, message: "Create blog fail!!!" };
  }
};

// fetch data
export const getAllBlogs = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { images: true },
      orderBy: { posted_at: "desc" },
    });
    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// get blog by id
export const getBlogById = async id => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        images: true,
        comments: {
          orderBy: { created_at: "desc" },
          where: { status: "approved" },
        },
      },
    });
    return blog;
  } catch (error) {
    console.error("getBlogById error:", error);
    return null;
  }
};

// add comment
export const addComment = async (prevState, formData) => {
  try {
    const rawData = Object.fromEntries(formData);

    const errors = validateComment(rawData);
    if (errors) {
      return { code: 1, errors };
    }

    await prisma.comment.create({
      data: {
        sender_name: rawData.sender_name,
        message: rawData.message,
        blog_id: rawData.blog_id,
      },
    });

    revalidatePath("/dashboard");
    return { code: 0, message: "Comment added successfully!!!" };
  } catch (error) {
    console.error("addComment error:", error);
    return { code: 1, message: "Add comment fail!!!" };
  }
};

// get comments by status
export const getCommentsByStatus = async status => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        status: status || "pending",
      },
    });
    return comments;
  } catch (error) {
    console.error("getCommentsByStatus error:", error);
    return [];
  }
};

// increment view count
export const incrementViewCount = async id => {
  try {
    await prisma.blog.update({
      where: { id },
      data: { view_count: { increment: 1 } },
    });
  } catch (error) {
    console.error("incrementViewCount error:", error);
  }
};

// pagination
export const getBlogsPaginated = async (page = 1, limit = 10, search = "") => {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? { title: { contains: search, mode: "insensitive" } }
      : {};

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: { images: true },
        orderBy: { posted_at: "desc" },
        skip,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    return { blogs, total, totalPages: Math.ceil(total / limit) };
  } catch (error) {
    console.error(error);
    return { blogs: [], total: 0, totalPages: 0 };
  }
};

// ====================Function Admin=========================
export const editBlogByAdmin = async (prevState, formData) => {
  try {
    const rawData = Object.fromEntries(formData);

    // 1. checking admin
    const user = await prisma.user.findUnique({
      where: { id: rawData.admin_id },
    });

    if (!user || user.type !== "ADMIN") {
      return { code: 1, message: "Unauthorized: Admin access required" };
    }

    // generate slug
    const slug = rawData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // 2. update Blog
    const blog = await prisma.blog.update({
      where: { id: rawData.id },
      data: {
        title: rawData.title,
        slug,
        content: rawData.content,
        excerpt: rawData.excerpt,
        sender_name: rawData.sender_name,
        status: rawData.status || "unpublished",
      },
    });

    // 3. จัดการ images
    const selectedImageIds = JSON.parse(rawData.selectedImageIds || "[]");

    // ลบ images ที่ถูกเอาออก
    await prisma.blogImage.deleteMany({
      where: {
        blog_id: blog.id,
        id: { notIn: selectedImageIds },
      },
    });

    // อัปโหลด images ใหม่ที่เป็น File จริง
    const imageFiles = Object.entries(rawData)
      .filter(
        ([key, value]) =>
          key.startsWith("images[") && value instanceof File && value.size > 0,
      )
      .map(([, file]) => file);

    if (imageFiles.length > 0) {
      const lastImage = await prisma.blogImage.findFirst({
        where: { blog_id: blog.id },
        orderBy: { order: "desc" },
      });
      const startOrder = lastImage ? lastImage.order + 1 : 0;

      const urls = [];
      for (const file of imageFiles) {
        const base64 = await fileToBase64(file);
        const url = await uploadImage(base64);
        urls.push(url);
      }

      await prisma.blogImage.createMany({
        data: urls.map((url, index) => ({
          blog_id: blog.id,
          url,
          order: startOrder + index,
        })),
      });
    }

    revalidatePath("/");
    return { code: 0, message: "Edit blog successfully!!!" };
  } catch (error) {
    console.error("editBlog error:", error);
    return { code: 1, message: "Edit blog fail!!!" };
  }
};

export const handleDeleteBlogByAdmin = async (prevState, formData) => {
  try {
    const rawData = Object.fromEntries(formData);
    console.log("rawData", rawData);

    const user = await prisma.user.findUnique({
      where: { id: rawData.admin_id },
    });

    if (!user || user.type !== "ADMIN") {
      return { code: 1, message: "Unauthorized: Admin access required" };
    }

    await prisma.blog.delete({
      where: { id: rawData.id },
    });

    revalidatePath("/");
    return { code: 0, message: "Delete blog successfully!!!" };
  } catch (error) {
    console.error("deleteBlog error:", error);
    return { code: 1, message: "Delete blog fail!!!" };
  }
};

export const upDateCommentStatus = async (prevState, formData) => {
  try {
    const rawData = Object.fromEntries(formData);

    await prisma.comment.update({
      where: { id: rawData.id },
      data: { status: rawData.status },
    });

    revalidatePath(`/blog/${rawData.blog_id}`);
    revalidatePath("/dashboard");

    return { code: 0, message: "Comment status updated successfully!!!" };
  } catch (error) {
    console.error("updateCommentStatus error:", error);
    return { code: 1, message: "Update comment status fail!!!" };
  }
};

// ==========================================================

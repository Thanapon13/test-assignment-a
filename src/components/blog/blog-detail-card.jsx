"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CommentForm from "@/components/blog/comment-form";

const BlogDetailCard = ({ blog }) => {
  const formatDate = date =>
    new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatViews = count => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {blog.sender_name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold leading-none">{blog.sender_name}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDate(blog.posted_at)}</span>
            <span>·</span>
            <Badge
              className={
                blog.status === "published"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }
            >
              {blog.status === "published" ? "Published" : "Unpublished"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-3">
        <h1 className="mb-2 text-lg font-bold">{blog.title}</h1>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
          {blog.content}
        </p>
      </div>

      {/* Images */}
      {blog.images?.length > 0 && (
        <div
          className={`grid gap-0.5 ${blog.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
        >
          {blog.images.slice(0, 4).map((image, index) => {
            const isLast = index === 3;
            const remaining = blog.images.length - 4;
            return (
              <div
                key={image.id}
                className={`relative overflow-hidden ${
                  blog.images.length === 1 ? "aspect-video" : "aspect-square"
                }`}
              >
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="(max-width: 672px) 100vw, 672px"
                  className="object-cover"
                />
                {isLast && remaining > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-2xl font-bold text-white">
                      +{remaining}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between border-t px-4 py-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Eye className="size-4" /> {formatViews(blog.view_count)} views
        </span>
        <span>{blog.comments?.length ?? 0} comments</span>
      </div>

      {/* Comments */}
      <div className="border-t">
        {!blog.comments?.length ? (
          <p className="p-4 text-center text-sm text-muted-foreground">
            No comments yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2 p-4">
            {blog.comments.map(comment => (
              <div key={comment.id} className="flex gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                  {comment.sender_name.charAt(0)}
                </div>
                <div
                  className="rounded-2xl bg-[#f0f2f5] px-3 py-2 min-w-0"
                  style={{ wordBreak: "break-all" }}
                >
                  <p className="text-xs font-semibold">{comment.sender_name}</p>
                  <p className="text-sm">{comment.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <CommentForm blogId={blog.id} />
      </div>
    </div>
  );
};

export default BlogDetailCard;

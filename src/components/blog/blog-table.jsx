"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, MoreHorizontal, ImageOff } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const BlogTable = ({ blogs, onEdit, onDelete, authenticateUser }) => {
  const router = useRouter();

  const formatDate = date =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatViews = count => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Images</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          {authenticateUser && (
            <TableHead className="text-center">Status</TableHead>
          )}
          <TableHead className="text-center">Views</TableHead>
          <TableHead>Posted</TableHead>
          {authenticateUser && (
            <TableHead className="w-[70px]">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {blogs.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="h-24 text-center text-muted-foreground"
            >
              No blog posts found.
            </TableCell>
          </TableRow>
        ) : (
          blogs.map(blog => {
            const allImages =
              blog.images?.map(img => ({ id: img.id, url: img.url })) ?? [];

            return (
              <TableRow
                key={blog.id}
                className="cursor-pointer"
                onClick={() => router.push(`/blog/${blog.id}`)}
              >
                <TableCell>
                  {allImages.length === 0 ? (
                    <div className="flex size-12 items-center justify-center rounded-md bg-muted">
                      <ImageOff className="size-5 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="flex -space-x-2">
                      {allImages.slice(0, 2).map((image, index) => (
                        <div
                          key={image.id}
                          className="relative size-11 overflow-hidden rounded-md border-2 border-background"
                        >
                          <Image
                            src={image.url}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                      ))}

                      {allImages.length > 2 && (
                        <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-md border-2 border-background bg-muted">
                          <span className="text-xs font-medium text-muted-foreground">
                            +{allImages.length - 2}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </TableCell>

                <TableCell className="max-w-[250px] truncate font-medium">
                  {blog.title}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {blog.sender_name}
                </TableCell>

                {authenticateUser && (
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        blog.status === "published" ? "default" : "secondary"
                      }
                      className={cn(
                        blog.status === "published"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
                      )}
                    >
                      {blog.status === "published"
                        ? "Published"
                        : "Unpublished"}
                    </Badge>
                  </TableCell>
                )}

                <TableCell className="text-right">
                  <span className="flex items-center justify-center gap-1 text-muted-foreground">
                    <Eye className="size-3.5" />
                    {formatViews(blog.view_count)}
                  </span>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {formatDate(blog.posted_at)}
                </TableCell>

                {/* btn : edit and delete  */}
                {authenticateUser && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <button
                            type="button"
                            className="size-8 inline-flex items-center justify-center"
                            onClick={e => e.stopPropagation()}
                          >
                            <MoreHorizontal className="size-4" />
                          </button>
                        }
                      />

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation();
                            onEdit(blog);
                          }}
                        >
                          <Pencil className="size-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation();
                            onDelete(blog);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default BlogTable;

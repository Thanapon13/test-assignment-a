"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlogForm from "./blog-form";
import BlogTable from "./blog-table";
import BlogStats from "./blog-stats";
import useAuth from "@/hooks/useAuth";
import BlogDeleteDialog from "./blog-delete-dialog";
import Pagination from "./pagination";

const Container_blog = ({
  data,
  currentPage,
  totalPages,
  total,
  search: initialSearch,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { authenticateUser } = useAuth();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(initialSearch || "");

  const handleCreate = () => {
    setSelectedBlog(null);
    setFormOpen(true);
  };
  const handleEdit = blog => {
    setSelectedBlog(blog);
    setFormOpen(true);
  };
  const handleDelete = blog => {
    setSelectedBlog(blog);
    setDeleteDialogOpen(true);
  };

  const stats = {
    total,
    published: data.filter(b => b.status === "published").length,
    views: data.reduce((sum, blog) => sum + blog.view_count, 0),
  };

  const handlePageChange = newPage => {
    router.push(`${pathname}?page=${newPage}&search=${searchValue}`);
  };

  const handleSearch = e => {
    e.preventDefault();
    router.push(`${pathname}?page=1&search=${searchValue}`);
  };

  return (
    <section className="min-h-screen bg-[#eef0f3]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
              <p className="mt-1 text-muted-foreground">
                Manage and publish your blog content
              </p>
            </div>
            <Button onClick={handleCreate}>
              <Plus className="size-4" />
              New Post
            </Button>
          </div>
          <BlogStats
            total={stats.total}
            published={stats.published}
            views={stats.views}
          />
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle>All Posts</CardTitle>
                <CardDescription>
                  A list of all blog posts with their current status and view
                  counts
                </CardDescription>
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  placeholder="Search by title..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  className="w-56"
                />
                <Button type="submit" variant="outline" size="icon">
                  <Search className="size-4" />
                </Button>
              </form>
            </div>
          </CardHeader>

          <CardContent>
            <BlogTable
              blogs={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
              authenticateUser={authenticateUser}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </CardContent>
        </Card>
      </div>

      <BlogForm
        open={formOpen}
        onOpenChange={setFormOpen}
        blog={selectedBlog}
        authenticateUser={authenticateUser}
      />

      <BlogDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        blog={selectedBlog}
        authenticateUser={authenticateUser}
      />
    </section>
  );
};

export default Container_blog;

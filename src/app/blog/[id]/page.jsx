import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBlogById, incrementViewCount } from "../actions";
import BlogDetailCard from "@/components/blog/blog-detail-card";
import { cookies } from "next/headers";

const BlogDetailPage = async ({ params }) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("ACCESS_TOKEN");
  const isAuthenticated = !!token;

  const backLink = isAuthenticated ? "/dashboard" : "/";

  const blogDetail = await getBlogById(id);

  if (blogDetail) {
    await incrementViewCount(id);
  }

  if (!blogDetail) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Blog not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link href={backLink}>
          <Button variant="ghost" className="mb-4 gap-2 cursor-pointer">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </Link>

        <BlogDetailCard blog={blogDetail} />
      </div>
    </div>
  );
};

export default BlogDetailPage;

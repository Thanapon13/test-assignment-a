"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { upDateCommentStatus } from "@/app/blog/actions";

const CommentManager = ({ comments }) => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 10000);

    return () => clearInterval(interval);
  }, [router]);

  const handleAction = async formData => {
    await upDateCommentStatus(null, formData);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Pending Comments:
          <Badge className="ml-2 bg-amber-100 text-amber-700">
            {comments.length}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {comments.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No pending comments
          </p>
        ) : (
          comments.map(c => (
            <div
              key={c.id}
              className="flex items-start justify-between gap-4 border-b px-6 py-4 last:border-0"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium">name: {c.sender_name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  message: {c.message}
                </p>
              </div>

              <Link
                href={`/blog/${c.blog_id}`}
                className="shrink-0 text-xs text-blue-500 hover:underline flex items-center gap-1"
                target="_blank"
              >
                View Blog
                <ExternalLink className="size-3" />
              </Link>

              <div className="flex shrink-0 gap-2">
                <form action={handleAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="blog_id" value={c.blog_id} />
                  <input type="hidden" name="status" value="approved" />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:text-green-700"
                  >
                    <Check className="size-4" />
                  </Button>
                </form>

                <form action={handleAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="blog_id" value={c.blog_id} />
                  <input type="hidden" name="status" value="rejected" />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="size-4" />
                  </Button>
                </form>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CommentManager;

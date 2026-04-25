"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, MessageSquareText } from "lucide-react";
import Container_blog from "@/components/blog/container_blog";
import CommentManager from "@/components/admin/comment-manager";
import useAuth from "@/hooks/useAuth";

const Container_Dashboard = ({
  data,
  total,
  currentPage,
  totalPages,
  comments,
  search,
}) => {
  const [activeTab, setActiveTab] = useState("posts");
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#eef0f3] p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between p-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>

        {/* Tabs Switcher */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={activeTab === "posts" ? "default" : "outline"}
            onClick={() => setActiveTab("posts")}
          >
            <LayoutDashboard className="mr-2 size-4" /> Manage Posts
          </Button>
          <Button
            variant={activeTab === "comments" ? "default" : "outline"}
            onClick={() => setActiveTab("comments")}
          >
            <MessageSquareText className="mr-2 size-4" /> Manage Comments
          </Button>
        </div>

        {/* Content Area */}
        {activeTab === "posts" ? (
          <Container_blog
            data={data}
            total={total}
            currentPage={currentPage}
            totalPages={totalPages}
            search={search}
          />
        ) : (
          <CommentManager comments={comments} />
        )}
      </div>
    </div>
  );
};

export default Container_Dashboard;

import Container_Dashboard from "@/components/admin/container-dashboard";
import { getBlogsPaginated, getCommentsByStatus } from "../blog/actions";

const DashboardPage = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = parseInt(params.page) || 1;
  const search = params.search || "";
  const limit = 10;

  const { blogs, total, totalPages } = await getBlogsPaginated(
    currentPage,
    limit,
    search,
  );
  const comments = await getCommentsByStatus("pending");

  return (
    <div>
      <Container_Dashboard
        data={blogs}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        comments={comments}
        search={search}
      />
    </div>
  );
};

export default DashboardPage;

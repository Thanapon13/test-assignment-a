import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BlogStats = ({ total, published, views }) => {
  const stats = [
    { label: "Total Posts", value: total },
    { label: "Published", value: published },
    { label: "Total Views", value: views },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-2xl">{stat.value}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default BlogStats;

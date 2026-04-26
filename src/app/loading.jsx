import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <section className="min-h-screen bg-[#eef0f3]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>

        <div className="bg-white rounded-xl p-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b">
              <Skeleton className="size-11 rounded-md" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

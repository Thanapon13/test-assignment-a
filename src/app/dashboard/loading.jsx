import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#eef0f3] p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between mb-8">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="flex gap-2 mb-6">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-36" />
        </div>

        <div className="bg-white rounded-xl p-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b">
              <Skeleton className="size-11 rounded-md" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-24 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

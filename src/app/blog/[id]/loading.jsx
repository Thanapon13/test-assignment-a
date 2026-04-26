import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Skeleton className="h-9 w-20 mb-4" />

        <div className="bg-white rounded-xl overflow-hidden shadow">
          {/* Header */}
          <div className="flex items-center gap-3 p-4">
            <Skeleton className="size-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Image */}
          <Skeleton className="aspect-video w-full" />

          {/* Stats */}
          <div className="flex justify-between px-4 py-2 border-t">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

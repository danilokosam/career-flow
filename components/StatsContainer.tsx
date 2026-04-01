"use client";
import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "@/utils/actions";
import { StatsCard, StatsLoadingCard } from "@/components/StatsCard";

export const StatsContainer = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  if (isPending) {
    return (
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
        <p className="text-destructive font-medium">
          Could not load statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      {/* We use default settings for greater security */}
      <StatsCard title="pending jobs" value={data?.pending || 0} />
      <StatsCard title="interviews set" value={data?.interview || 0} />
      <StatsCard title="jobs declined" value={data?.declined || 0} />
    </div>
  );
};

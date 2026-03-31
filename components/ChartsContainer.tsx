"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getChartsDataAction } from "@/utils/actions";
import { useEffect } from "react";
import { toast } from "sonner";

export const ChartsContainer = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.message || "An error occurred whilst loading the graph",
      );
    }
  }, [isError, error]);

  if (isPending) return <h2 className="text-xl font-medium">Please wait...</h2>;

  if (isError) {
    return (
      <h2 className="mt-16 text-center text-red-500">
        Failed to load chart data.
      </h2>
    );
  }

  if (!data || data.length < 1) {
    return (
      <h2 className="mt-16 text-center text-gray-400">
        No applications found for the last 6 months.
      </h2>
    );
  }

  return (
    <section className="mt-16">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Monthly Applications
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

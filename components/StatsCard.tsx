import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type StatsCardsProps = {
  title: string;
  value: number;
};

export const StatsCard = ({ title, value }: StatsCardsProps) => {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="capitalize text-muted-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-4xl font-extrabold text-primary">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export const StatsLoadingCard = () => {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center">
        {/* A skeleton for the title */}
        <Skeleton className="h-6 w-30" />
        {/* A skeleton for the large number */}
        <Skeleton className="h-10 w-10 rounded-md" />
      </CardHeader>
    </Card>
  );
};

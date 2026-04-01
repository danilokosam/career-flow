/**
 * JobCard Component
 *
 * Displays a single job application as a card with:
 * - Job position (title) and company name
 * - Job details (mode, location, date, status)
 * - Action buttons (edit, delete)
 *
 * This is a presentational component that receives job data as props.
 * Used in the jobs list page to display each job application.
 */

import { JobType } from "@/utils/types";
import { MapPin, Briefcase, CalendarDays, RadioTower } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { JobInfo } from "@/components/JobInfo";
import { DeleteButton } from "@/components/DeleteButton";

export const JobCard = ({ job }: { job: JobType }) => {
  const date = dayjs(job.createdAt).format("MMM DD, YYYY");

  return (
    <Card className="bg-muted flex flex-col justify-between">
      <div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{job.position}</CardTitle>
          <CardDescription className="text-base font-medium text-primary/80">
            {job.company}
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2">
          <JobInfo icon={<Briefcase className="w-4 h-4" />} text={job.mode} />
          <JobInfo icon={<MapPin className="w-4 h-4" />} text={job.location} />
          <JobInfo icon={<CalendarDays className="w-4 h-4" />} text={date} />

          {/* Badge with dynamic colour logic */}
          <div className="flex items-center">
            <Badge
              variant={job.status === "declined" ? "destructive" : "default"}
              className="w-fit capitalize px-3 py-1"
            >
              <RadioTower className="w-3 h-3 mr-2" />
              {job.status}
            </Badge>
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex gap-x-2 pt-2">
        <Button asChild size="sm" variant="outline">
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteButton id={job.id} />
      </CardFooter>
    </Card>
  );
};

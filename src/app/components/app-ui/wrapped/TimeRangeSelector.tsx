"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TimeRangeSelectorProps {
  initialTimeRange: string;
}

export default function TimeRangeSelector({ initialTimeRange }: TimeRangeSelectorProps) {
  const [timeRange, setTimeRange] = useState(initialTimeRange);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange);
    
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams);
    // Set the timeRange parameter
    params.set('timeRange', newTimeRange);
    
    // Navigate to the same page but with updated query parameters
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="time_range">Time Range:</Label>
      <Select value={timeRange} onValueChange={handleTimeRangeChange}>
        <SelectTrigger id="time_range" className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="short_term">Last 4 Weeks</SelectItem>
            <SelectItem value="medium_term">Last 6 Months</SelectItem>
            <SelectItem value="long_term">All Time</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import Dropdown from "./Dropdown";
import clsx from "clsx";

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'In Progress', value: 'live' },
  { label: 'Completed', value: 'completed' },
];

type Props = {
  className?: string;
}

export default function TournamentControls({className}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className={clsx("flex flex-col sm:flex-row gap-4", className)}>
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search tournaments..."
          className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none"
          defaultValue={searchParams.get("q")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {isPending && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 animate-pulse">
            Loading...
          </span>
        )}
      </div>

      <Dropdown
        options={STATUS_OPTIONS}
        value={searchParams.get("status")?.toString() || ""}
        onChange={handleFilter}
        placeholder="All Statuses"
      />
    </div>
  );
}
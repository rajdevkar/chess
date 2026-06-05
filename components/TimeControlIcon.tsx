import { TimeControl } from "@/types/tournament";
import { BoltIcon, ClockIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type Props = { timeControl: TimeControl; className?: string }

const TimeControlIcon = ({ timeControl, className }: Props) => {
  const Icon =
    timeControl === "Blitz" ? RocketLaunchIcon :
      timeControl === "Rapid" ? BoltIcon :
        ClockIcon;

  const iconColor =
    timeControl === "Blitz" ? "text-red-500" :
      timeControl === "Rapid" ? "text-amber-500" :
        "text-blue-500";

  return (
    <div className="group/inner relative inline-flex justify-center items-center">
      <Icon className={clsx("size-8", iconColor, className)} aria-hidden="true" />

      <div className="pointer-events-none absolute bottom-full mb-2 flex flex-col items-center opacity-0 transition-opacity duration-200 group-hover/inner:opacity-100 z-10">
        <span className="whitespace-nowrap rounded bg-slate-900 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
          {timeControl}
        </span>
        <div className="h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-slate-900"></div>
      </div>
    </div>
  );
};

export default TimeControlIcon;
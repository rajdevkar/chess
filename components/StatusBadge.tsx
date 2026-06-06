import { TournamentStatuses } from "@/types/tournament";
import clsx from "clsx";

type Props = { status: TournamentStatuses; className?: string }

const StatusBadge = ({ status, className }: Props) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'upcoming':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'live':
        return 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse';
      case 'completed':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize", getStatusStyles(), className)}>
      {status}
    </span>
  );
};

export default StatusBadge;
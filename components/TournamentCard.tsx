"use client"

import { Tournament } from '@/types/tournament';
import { ArrowRightIcon, CalendarIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useState } from 'react';
import StatusBadge from './StatusBadge';
import TimeControlIcon from './TimeControlIcon';

type Props = {
  tournament: Tournament;
  className?: string;
}

export function TournamentCard({ tournament, className }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isCompleted = tournament.status === 'completed';
  const isInProgress = tournament.status === 'live';
  const isUpcoming = tournament.status === 'upcoming';


  const handleJoinClick = () => {
    if (isCompleted) return;
    setIsModalOpen(true);
  };

  return (
    <>
      <li className={clsx("group hover:bg-slate-50 transition-colors duration-200 p-4 sm:p-6", className)}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <TimeControlIcon timeControl={tournament.timeControl} className="bg-slate-100 p-2 rounded-lg hidden sm:block" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-slate-900 leading-tight">
                  {tournament.name}
                </h2>
                <StatusBadge status={tournament.status} />
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  {format(tournament.startTime, 'LLLL d, yyyy')}
                </span>
                <span className="flex items-center gap-1.5">
                  <UsersIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  {tournament.playersJoined.toLocaleString()} / {tournament.maxPlayers.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <button
            className={clsx(
              "w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm focus:outline-none",
              isUpcoming
                ? 'cursor-not-allowed bg-slate-900 text-white hover:bg-slate-800'
                : isInProgress
                  ? 'bg-brand text-white hover:bg-brand-hover'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            )}
            aria-label={`${isCompleted ? 'View' : 'Join'} ${tournament.name}`}
            disabled={isUpcoming}
            onClick={handleJoinClick}
          >
            {isCompleted ? 'View Results' : 'Join Arena'}
            <ArrowRightIcon className={clsx("w-4 h-4 ml-2 opacity-70 transition-transform", !isUpcoming ? "group-hover:translate-x-1" : "")} aria-hidden="true" />
          </button>
        </div>
      </li>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 transform transition-all z-10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 focus:outline-none"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Join Tournament?
              </h3>
              <p className="text-sm text-slate-500">
                You are about to register for <span className="font-semibold text-slate-800">{tournament.name}</span>.
                Please confirm your entry below.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Time Control:</span>
                <span className="font-medium text-slate-800">{tournament.timeControl}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Starts:</span>
                <span className="font-medium text-slate-800">{format(tournament.startTime, "LLLL d, yyyy")}</span>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Successfully joined ${tournament.name}!`);
                  setIsModalOpen(false);
                }}
                className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
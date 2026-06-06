"use client"

import { Tournament } from '@/types/tournament';
import { ArrowRightIcon, CalendarIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useState } from 'react';
import Button from './Button';
import StatusBadge from './StatusBadge';
import TimeControlIcon from './TimeControlIcon';

type Props = {
  tournament: Tournament;
  className?: string;
}

export function TournamentCard({ tournament, className }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

  const isCompleted = tournament.status === 'completed';
  const isInProgress = tournament.status === 'live';
  const isUpcoming = tournament.status === 'upcoming';


  const handleJoinClick = () => {
    if (isInProgress) return;
    if (isCompleted) {
      setIsResultsModalOpen(true);
      return;
    }
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

          <Button
            variant={(isUpcoming && tournament.playersJoined < tournament.maxPlayers) || isCompleted ? "primary" : "secondary"}
            aria-label={`${isCompleted ? 'View' : 'Join'} ${tournament.name}`}
            disabled={isUpcoming && tournament.playersJoined >= tournament.maxPlayers}
            onClick={handleJoinClick}
            rightIcon={
              <ArrowRightIcon className={clsx(
                "w-4 h-4 ml-2 opacity-70 transition-transform",
                (isUpcoming && tournament.playersJoined < tournament.maxPlayers) || isCompleted ? "group-hover:translate-x-1 text-white" : "text-brand"
              )} aria-hidden="true" />
            }
          >
            {isCompleted ? 'View Results' : 'Join Arena'}
          </Button>
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
            <div className="mb-6">
              <div className="w-full flex flex-row items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900">
                  Join Tournament?
                </h3>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer transition-colors duration-75 ease-in-out"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-slate-500">
                You are about to register for <span className="font-semibold text-slate-800">{tournament.name}</span>.
                Please confirm your entry below.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200 text-sm space-y-2">
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
              <Button
                variant="secondary"
                aria-label="Close modal"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                aria-label="Join Tournament"
                onClick={() => {
                  alert(`Successfully joined ${tournament.name}!`);
                  setIsModalOpen(false);
                }}
              >
                Confirm Registration
              </Button>
            </div>
          </div>
        </div>
      )}

      {isResultsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsResultsModalOpen(false)}
          />

          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 transform transition-all z-10">
            <div className="mb-6">
              <div className="w-full flex flex-row items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900">
                  Final Standings
                </h3>

                <button
                  type="button"
                  onClick={() => setIsResultsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer transition-colors duration-75 ease-in-out"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-slate-500">
                The <span className="font-semibold text-slate-800">{tournament.name}</span> has concluded.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200 text-sm flex flex-col gap-3 divide-y divide-slate-200/60">
              <div className="flex items-center gap-2 not-last:pb-4">
                <span className="text-amber-500 text-base" aria-hidden="true">🥇</span>
                <span className="font-medium text-slate-800">First Winner Name</span>
              </div>
              <div className="flex items-center gap-2 not-last:pb-4">
                <span className="text-amber-500 text-base" aria-hidden="true">🥈</span>
                <span className="font-medium text-slate-800">Second Winner Name</span>
              </div>
              <div className="flex items-center gap-2 not-last:pb-4">
                <span className="text-amber-500 text-base" aria-hidden="true">🥉</span>
                <span className="font-medium text-slate-800">Third Winner Name</span>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <Button
                variant="secondary"
                aria-label="Close modal"
                onClick={() => setIsResultsModalOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                aria-label="View Full Leaderboard"
                onClick={() => {
                  alert(`Navigating to full leaderboard...`);
                  setIsResultsModalOpen(false);
                }}
              >
                Full Leaderboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
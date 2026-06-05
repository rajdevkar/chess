import { TournamentCard } from '@/components/TournamentCard';
import TournamentControls from '@/components/TournamentControls';
import { getTournaments } from '@/lib/api';
import { Tournament } from '@/types/tournament';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TournamentsPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const query = typeof searchParams?.q === 'string' ? searchParams.q : "";
  const status = typeof searchParams?.status === 'string' ? searchParams.status : "";

  const tournaments = await getTournaments(query, status);

  return (
    <div className="max-h-screen flex flex-col mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-2xl font-bold mb-6">Chess Tournaments</h1>
      <TournamentControls className="mb-4" />
      <ul className="border border-slate-200 rounded-md divide-y divide-slate-200 bg-white overflow-scroll">
        {tournaments.length > 0 ? (
          tournaments.map((tournament: Tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))
        ) : (
          <li className="w-full p-8 text-center text-slate-500">
            No tournaments found matching your criteria.
          </li>
        )}
      </ul>
    </div>
  );
}
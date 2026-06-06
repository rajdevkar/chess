import { Tournament } from "@/types/tournament";

export async function getTournaments(query: string, statusFilter: string) {
  const res = await fetch(process.env.API_URL + '/api/tournaments', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tournaments');
  }

  const data: Tournament[] = await res.json();

  return data.filter((tournament) => {
    const matchesSearch = tournament.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter ? tournament.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });
}
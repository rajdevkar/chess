export type Tournament = {
  id: string,
  name: string,
  timeControl: TimeControl,
  startTime: string,
  playersJoined: number,
  maxPlayers: number,
  status: TournamentStatuses,
};

export type TimeControl = "Blitz" | "Rapid" | "Classical";

export type TournamentStatuses = "upcoming" | "live" | "completed";
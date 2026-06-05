import { NextResponse } from 'next/server';
import tournaments from '../../../data/tournament.json';

export async function GET() {
  return NextResponse.json(tournaments);
}
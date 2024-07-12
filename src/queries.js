import { HttpError } from 'wasp/server'

export const getTeams = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Team.findMany();
}

export const getLeagues = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.League.findMany();
}

export const getUserPicks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Pick.findMany({
    where: { userId: context.user.id },
    include: { team: true }
  });
}
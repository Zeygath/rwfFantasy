import { HttpError } from 'wasp/server'

export const createLeague = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.League.create({
    data: {
      name: args.name,
      private: args.private
    }
  });
}

export const joinLeague = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const league = await context.entities.League.findUnique({
    where: { id: args.leagueId }
  });

  if (!league) { throw new HttpError(404, 'League not found') };

  return context.entities.User.update({
    where: { id: context.user.id },
    data: { leagues: { connect: { id: args.leagueId } } }
  });
}

export const makePick = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newPick = await context.entities.Pick.create({
    data: {
      user: { connect: { id: context.user.id } },
      team: { connect: { id: args.teamId } },
      pulls: args.pulls
    }
  });

  return newPick;
}
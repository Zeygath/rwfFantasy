import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getLeagues, joinLeague, makePick } from 'wasp/client/operations';

const LeagueHubPage = () => {
  const { data: leagues, isLoading, error } = useQuery(getLeagues);
  const joinLeagueFn = useAction(joinLeague);
  const makePickFn = useAction(makePick);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {leagues.map((league) => (
        <div
          key={league.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{league.name}</div>
          <div>{league.private ? 'Private' : 'Public'}</div>
          <div>
            <button
              onClick={() => joinLeagueFn({ leagueId: league.id })}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Join League
            </button>
            <button
              onClick={() => makePickFn({ leagueId: league.id })}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Make Pick
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeagueHubPage;
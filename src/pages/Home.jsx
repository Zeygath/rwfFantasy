import React, { useState, useEffect } from 'react';
import { useQuery, getTeams, getUserPicks } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [teams, setTeams] = useState([]);
  const [userPicks, setUserPicks] = useState([]);

  const { data: teamsData, isLoading: teamsLoading, error: teamsError } = useQuery(getTeams);
  const { data: userPicksData, isLoading: userPicksLoading, error: userPicksError } = useQuery(getUserPicks);

  useEffect(() => {
    if (teamsData) setTeams(teamsData);
  }, [teamsData]);

  useEffect(() => {
    if (userPicksData) setUserPicks(userPicksData);
  }, [userPicksData]);

  if (teamsLoading || userPicksLoading) return 'Loading...';
  if (teamsError || userPicksError) return 'Error: ' + (teamsError || userPicksError);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Home Page</h1>
      <div className='mb-4'>
        <h2 className='text-lg font-bold'>Teams:</h2>
        <ul>
          {teams.map((team) => (
            <li key={team.id}>{team.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className='text-lg font-bold'>User Picks:</h2>
        <ul>
          {userPicks.map((pick) => (
            <li key={pick.id}>{pick.team.name} - {pick.pulls} pulls</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
import customFetch from '../utils/CustomFetch';
import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../components';

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};
const Stats = () => {
  const data = useLoaderData();
  console.log(data)
   return (
     <>
       {/* <StatsContainer defaultStats={data?.defaultStats} />
       {data?.monthlyApplications?.length > 0 && (
         <ChartsContainer data={monthlyApplications} />
       )} */}
       <StatsContainer defaultStats={data} />
     </>
   );
}

export default Stats
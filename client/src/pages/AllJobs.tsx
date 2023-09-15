 import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/CustomFetch";
import { useLoaderData } from "react-router-dom";
import { AllJobsContext } from '../components/DashboardContext';
import { QueryClient } from "@tanstack/react-query";

const allJobQuery = (params: any) => {
  
}

export const loader =(queryClient: QueryClient) => async ({request}: any) => {
  
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    // const { data } = await customFetch.get('/jobs', {
    //   params,
    // });

    return {
      // data,
      searchValues: { ...params },
    };
 
    // toast.error(error.response.data.msg);
    // return error;
  
};


const AllJobs = () => {
  const { data, searchValues } = useLoaderData() as any;
  console.log(data)
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
}

export default AllJobs
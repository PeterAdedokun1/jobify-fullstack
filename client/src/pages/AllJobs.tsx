 import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/CustomFetch";
import { useLoaderData } from "react-router-dom";
import { AllJobsContext } from '../components/DashboardContext';

export const loader = async ({request}: any) => {
    try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await customFetch.get('/jobs', {
      params,
    });

    return {
      data,
      searchValues: { ...params },
    };
  } catch (error: any) {
    toast.error(error.response.data.msg);
    return error;
  }
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
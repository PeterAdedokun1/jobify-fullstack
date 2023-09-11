import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/CustomFetch";
import { useLoaderData } from "react-router-dom";
import { AllJobsContext } from '../components/DashboardContext';

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return {data}
  } catch (error: any) {
     toast.error(error?.response?.data?.msg);
     return error;
  }
}

const AllJobs = () => {
  const { data } = useLoaderData() as any;
  return (
    <AllJobsContext.Provider value={{data}}>
      <SearchContainer />
      <JobsContainer/>
    </AllJobsContext.Provider>
  )
}

export default AllJobs
import React from 'react'
import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/CustomFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { AllJobsContext } from '../components/DashboardContext';

export const loader = async ({ request }: any) => {
  try {
    const { data } = await customFetch.get("/jobs");
    // console.log(data)
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
import React, { useContext } from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { AllJobsContext } from "./DashboardContext";
const JobsContainer = () => {
  const contextValue = useContext(AllJobsContext);
  if (contextValue?.data?.jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {contextValue?.data?.jobs.map((job: any) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;

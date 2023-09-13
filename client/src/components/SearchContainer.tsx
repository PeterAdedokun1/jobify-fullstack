
import { FormRow, FormRowSelect } from "./";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { AllJobsContext} from "../components/DashboardContext";
import  { FormEvent, useContext } from "react";

const SearchContainer = () => {
  const contextValue = useContext(AllJobsContext);
  const { search, jobStatus, jobType, sort } = contextValue?.searchValues;
  const submit = useSubmit()
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={(e: FormEvent<HTMLInputElement>) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e: FormEvent<HTMLInputElement>) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e: FormEvent<HTMLInputElement>) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            onChange={(e: FormEvent<HTMLInputElement>) => {
              submit(e.currentTarget.form);
            }}
            list={[...Object.values(JOB_SORT_BY)]}
          />

          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          {/* <button type="button" className="btn btn-btn delete-btn">
            explore 
          </button> */}
        </div>
      </Form>
    </Wrapper>
  );
}

export default SearchContainer
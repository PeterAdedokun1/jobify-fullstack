
import { FormRow, FormRowSelect } from "./";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { AllJobsContext } from "../components/DashboardContext";
const SearchContainer = () => {
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow type="search" name="search" defaultValue="a" />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue="all"
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue="all"
          />
          <FormRowSelect
            name="sort"
            defaultValue="newest"
            list={[...Object.values(JOB_SORT_BY)]}
          />

          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <button
            type="button"
            className="btn btn-block formBtn"
          >
            explore the app
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default SearchContainer
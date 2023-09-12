import { redirect } from "react-router-dom";
import customFetch from "../utils/CustomFetch";
import { toast } from "react-toastify";

export const action = async ({params}: any) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success("Job deleted successfully");
  } catch (error:any) {
     toast.error(error.response.data.msg);
  }
    return redirect("/dashboard/all-jobs");
};

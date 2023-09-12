import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/CustomFetch"
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { user, jobs } = useLoaderData() as any
 return (
   <Wrapper>
     <StatItem
       title="current users"
       count={user}
       color="#e9b949"
      //  bcg="#565656"
       icon={<FaSuitcaseRolling />}
     />
     <StatItem
       title="total jobs"
       count={jobs}
       color="#647acb"
      //  bcg="#e0e8f9"
       icon={<FaCalendarCheck />}
     />
   </Wrapper>
 );
};

export default Admin;

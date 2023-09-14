import { Navbar, SmallSideBar, Loading } from "../components";
import { BigSideBar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { useState } from "react";
import { DashboardContext } from "../components/DashboardContext";
// import { User } from "../components/DashboardContext";
import { checkDefaultTheme } from "../App";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import customFetch from "../utils/CustomFetch";
import { toast } from "react-toastify";
import { QueryClient, useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch("/users/current-user");
    return data;
  },
};

export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};
interface Client {
  queryClient: QueryClient;
}
const DashboardLayout = ({ queryClient }: Client) => {
  const [showSidebar, setShowSideBar] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme.toString());
  };
  const toggleSideBar = () => {
    setShowSideBar(!showSidebar);
  };
  const logoutUser = async () => {
    navigate("/");

    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logging out..");
  };

  const { user } = useQuery(userQuery).data;
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;

import { Navbar, SmallSideBar } from "../components";
import { BigSideBar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { useState } from "react";
import DashboardContext from "../components/DashboardContext";
import { User } from "../components/DashboardContext";
import { checkDefaultTheme } from "../App";
import { Outlet, redirect, useLoaderData ,useNavigate} from "react-router-dom";
import customFetch from "../utils/CustomFetch";
import { toast } from "react-toastify";
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = ({ isDarkThemeEnabled }: any) => {
  const [showSidebar, setShowSideBar] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);
  const navigate = useNavigate()
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
    toast.success("Logging out..")
  };

  const { user } = useLoaderData() as any;
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
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;

import { Outlet } from "react-router-dom";
import { Navbar, SmallSideBar } from "../components";
import { BigSideBar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { useState } from "react";
import DashboardContext from "../components/DashboardContext";
import { User } from "../components/DashboardContext";
import { checkDefaultTheme } from "../App";
const DashboardLayout = ({ isDarkThemeEnabled }: any) => {
  const user: User = { name: "peter" };
  const [showSidebar, setShowSideBar] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);
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
    console.log("log out usersssdss");
  };
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
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;

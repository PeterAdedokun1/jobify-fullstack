import { useContext } from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo } from "../components";
import NavLinks from "./NavLinks";
import { DashboardContext } from "./DashboardContext";

const BigSideBar = () => {
  const contextValue = useContext(DashboardContext);
  return (
    <Wrapper>
      <div
        className={
          contextValue?.showSidebar
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;

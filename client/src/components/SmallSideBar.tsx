import { useContext } from "react";
import DashboardContext from "./DashboardContext";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { Logo } from ".";
import NavLinks from "./NavLinks";
const SmallSideBar = () => {
  const contextValue = useContext(DashboardContext);
  return (
    <Wrapper>
      <div
        className={
          contextValue?.showSidebar
            ? "sidebar-container show-sidebar"
            : "sidebar-container"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={contextValue?.toggleSideBar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo   />
          </header>
          <NavLinks/>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;

import { useContext } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import { Logo } from "../components";
import { DashboardContext } from "./DashboardContext";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "../assets/ThemeToggle";
const Navbar = () => {
  const contextValue = useContext(DashboardContext);

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={contextValue?.toggleSideBar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState, useContext } from "react";
import {DashboardContext} from "./DashboardContext";
const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const contextValue = useContext(DashboardContext)
    return (
      <Wrapper>
        <button
          type="button"
          className="btn logout-btn"
          onClick={() => setShowLogout(!showLogout)}
        >
          <FaUserCircle />
          {contextValue?.user?.name}
          <FaCaretDown />
        </button>
        <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
          <button type="button" className="dropdown-btn" onClick={contextValue?.logoutUser}>
            logout
          </button>
        </div>
      </Wrapper>
    );
};

export default LogoutContainer;

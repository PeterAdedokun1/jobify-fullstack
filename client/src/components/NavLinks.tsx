import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
type BigSidebar = {
  isBigSidebar?: boolean;
};
const NavLinks = ({ isBigSidebar}: BigSidebar) => {
  const contextValue = useContext(DashboardContext);
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { icon, path, text } = link;
        const { role } = contextValue?.user as any
        if (path === "admin" && role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? undefined : contextValue?.toggleSideBar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;

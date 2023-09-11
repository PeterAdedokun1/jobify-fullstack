import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import {DashboardContext} from "../components/DashboardContext";
import { useContext } from "react";
const ThemeToggle = () => {
  const contextValue = useContext(DashboardContext);
  return (
    <Wrapper onClick={contextValue?.toggleDarkTheme}>
      {contextValue?.isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;

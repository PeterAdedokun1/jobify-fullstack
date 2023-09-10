import { createContext } from "react";

export interface User {
  name: string;
}
interface DashBoardContextProps {
  user?: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSideBar: () => void;
  logoutUser: () => void;
}

const DashboardContext = createContext<DashBoardContextProps | undefined>(
  undefined
);

export default DashboardContext;

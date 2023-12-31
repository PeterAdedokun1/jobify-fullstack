import { createContext } from "react";

export interface User {
  name: string;
  avatar: string;
  role: string;
}
interface DashBoardContextProps {
  user?: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSideBar: () => void;
  logoutUser: () => void;
}

interface AllJobsContextProps{
  data: any
  searchValues: any
}

export const DashboardContext = createContext<DashBoardContextProps | undefined>(
  undefined
);
export const AllJobsContext = createContext<AllJobsContextProps | undefined>(
  undefined
);





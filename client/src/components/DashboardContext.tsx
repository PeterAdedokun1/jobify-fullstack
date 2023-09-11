import { createContext } from "react";
import { Interface } from "readline";

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
interface Jobs {
  _id: string;
  company: string;
  position: string;
  jobStatus: string;
  jobType: string;
  jobLocation: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?:string
}
interface AllJobsContextProps{
  data:any
}

export const DashboardContext = createContext<DashBoardContextProps | undefined>(
  undefined
);
export const AllJobsContext = createContext<AllJobsContextProps | undefined>(
  undefined
);





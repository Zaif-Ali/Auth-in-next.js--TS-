import { NextPage } from "next";
import { ReactNode } from "react";
import Navbar from "../navbar";
import { navitems } from "../../Data/Navitems";

interface Props {
  children: ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
};

export default Layout;

import React from "react";
import { AccountToggle } from "./AcountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouterSelect";
import { Plan } from "./Plan";

type SidebarProps = {
  Name: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ Name }) => {
  return (
    <div>
      <div className="overflow-y-scroll scrollbar-hide sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        <RouteSelect Name={Name} />
      </div>

      <Plan />
    </div>
  );
};

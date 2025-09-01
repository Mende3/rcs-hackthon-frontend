import React from "react";
import {
  FiDollarSign,
  FiHome,
  FiLink,
  FiPaperclip,
  FiUsers,
  FiSettings,
  FiUser
} from "react-icons/fi";
import { RiUserCommunityLine, RiDashboardLine, RiFileHistoryLine  } from "react-icons/ri";
import { BiAnalyse } from "react-icons/bi";
import { MdOutlineSmsFailed } from "react-icons/md";

import { Link } from "react-router-dom";


type RouteSelectProps = {
  Name: string;
};

export const RouteSelect: React.FC<RouteSelectProps> = ({ Name }) => {
  return (
    <div className="space-y-1">
      <RouteButton Icon={RiDashboardLine } selected={Name === "dashboard"} title="Painel" to="/painel" />
      <RouteButton Icon={RiFileHistoryLine } selected={Name === "history"} title="Histórico" to="/Historico" />
      <RouteButton Icon={FiUser} selected={Name === "perfil"} title="Perfil" to="/Perfil" />
      <RouteButton Icon={FiSettings} selected={Name === "settings"} title="Configurações" to="/configuracao" />
    </div>
  );
};

type RouteButtonProps = {
  selected: boolean;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  to?: string;
};

const RouteButton: React.FC<RouteButtonProps> = ({ selected, Icon, title, to }) => {
  return (
    <Link
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-gray-900 text-white shadow"
          : "hover:bg-gray-900 bg-transparent text-white shadow-none"
      }`}
      to={to || "#"}
    >
      <Icon className={selected ? "text-blue-500" : "text-stone-400"} />
      <span>{title}</span>
    </Link>
  );
};

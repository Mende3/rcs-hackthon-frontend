import React from "react";
import { FiCalendar } from "react-icons/fi";
import { StatCards } from "./StatCards";

import { useUser } from "../../hooks/useUser";

export const TopBar = () => {
    const { user, isAuthenticated } = useUser();
    
    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-white">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className="text-sm font-bold block text-white">Seja bem-vidno {user?.first_name}</span>
                    <span className="text-xs block text-white">
                        Sexta feira, 08 de Agosto 2025
                    </span>
                </div>
                <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:text-blue-500 hover:font-bold px-3 py-1.5 rounded">
                    <FiCalendar />
                    <span>Prev 6 meses</span>
                </button>
            </div>
        </div>
    )
}
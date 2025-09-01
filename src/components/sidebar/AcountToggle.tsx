import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { useUser } from "../../hooks/useUser";

export const AccountToggle = () => {
    const { user, isAuthenticated } = useUser();
    return (
        <div className="border-b mb-4 mt-2 pb-4 border-white">
            <button className="flex p-0.5 hover:bg-gray-900 rounded transition-colors relative gap-2 w-full items-center">
                <img
                    src="https://api.dicebear.com/9.x/notionists/svg"
                    alt="avatar"
                    className="size-8 rounded shrink-0 bg-blue-500 shadow"
                />
                <div className="text-start">
                    <span className="text-sm font-bold block text-white">{user?.first_name} {user?.last_name}</span>
                    <span className="text-xs block text-stone-500 text-white">{user?.email}</span>
                </div>

                <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
                <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
            </button>
        </div>
    )
}
import React from "react";
import { FiEye } from "react-icons/fi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

export const Visualizer = () => {
    return (
        <div className="col-span-4 overflow-hidden rounded border border-white  bg-white">
        <div className="p-4">
            <h3 className="flex items-center justify-between gap-1.5 font-medium">
            <FiEye />Monitor
            </h3>
            <h3>
            </h3>
        </div>

        <div className="h-64 px-4 flex items-center justify-center rounded">
            <span className="text-stone-400 italic select-none">Placeholder de gráfico</span>
        </div>
        </div>
    )
}
import { div } from "framer-motion/client";

import { Sidebar } from "../../components/sidebar/Sidebar";
import { DashBoard } from "../../components/dashboard/DashBoard";

export default function Dashboard () {
    return (
         <div className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
            <Sidebar  Name="dashboard" />
            <DashBoard />
        </div>
    )
}
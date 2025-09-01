import React from "react";

import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { Visualizer } from "./Visualizer";
import { RecentRequests } from "./RecentRequests";

export const Grid = () => {
    return (
        <div className="px-4 grid gap-3 grid-cols-12">
            <StatCards />
            <ActivityGraph />
            <Visualizer />
            <RecentRequests />
        </div>
    )
}
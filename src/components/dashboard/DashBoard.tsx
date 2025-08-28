import React from "react";

import { TopBar } from "./TopBar";
import { Grid } from "./Grid";

export const DashBoard = () => {
    return (
        <div className="bg-gray-900 rounded-lg pb-4 shadow">
            <TopBar />
            <Grid />
        </div>
    )
}
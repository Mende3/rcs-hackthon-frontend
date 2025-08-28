"use client";

import React from "react";
import { FiUser } from "react-icons/fi";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

// Tipagem para cada ponto no gráfico
type ActivityData = {
  name: string;
  geradas: number;
  respondidas: number;
};

const data: ActivityData[] = [
  { name: "Seg", geradas: 275, respondidas: 41 },
  { name: "Ter", geradas: 200, respondidas: 30 },
  { name: "Qua", geradas: 300, respondidas: 60 },
  { name: "Qui", geradas: 250, respondidas: 50 },
  { name: "Sex", geradas: 250, respondidas: 50 },
];

export const ActivityGraph: React.FC = () => {
  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300 bg-white">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Actividade da automação de respostas
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="respondidas"
              stroke="#18181b"
              fill="#18181b"
            />
            <Line
              type="monotone"
              dataKey="geradas"
              stroke="#3B82F6"
              fill="#3B82F6"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { MdMarkunreadMailbox, MdSmsFailed } from "react-icons/md";
import { BsFillSendCheckFill } from "react-icons/bs";

type CardProps = {
  title: string;
  value: string | number;
  pillText: string;
  trend: "up" | "down";
  period: string;
  status: "opened" | "sent" | "fail";
};

export const StatCards: React.FC = () => {
  return (
    <>
      <Card
        title="por responder"
        value="200"
        pillText="3%"
        trend="up"
        period="ultimo foi enviado à 14h"
        status="opened"
      />
      <Card
        title="respondidos"
        value="800"
        pillText="3%"
        trend="up"
        period="ultimo foi enviado à 5min"
        status="sent"
      />
      <Card
        title="reclamações"
        value="30"
        pillText="8%"
        trend="down"
        period="ultimo foi enviado à 3s"
        status="fail"
      />
    </>
  );
};

const Card: React.FC<CardProps> = ({
  title,
  value,
  pillText,
  trend,
  period,
  status,
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-white">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm text-white">
            <div className="flex items-center justify-between p-0.5 gap-1">
              {status === "opened" ? (
                <MdMarkunreadMailbox />
              ) : status === "sent" ? (
                <BsFillSendCheckFill />
              ) : (
                <MdSmsFailed />
              )}
              {title}
            </div>
          </h3>
          <p className="text-3xl font-semibold text-white">{value}</p>
        </div>
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-white">{period}</p>
    </div>
  );
};

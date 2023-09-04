"use client";
import React, { FC } from "react";
import HeatMap from "@uiw/react-heat-map";
import Tooltip from "@uiw/react-tooltip";
import { secondsToHoursMinutes } from "@/lib/helpers";
import Container from "./Container";

interface HeatmapProps {
  values: any;
}

const Heatmap: FC<HeatmapProps> = ({ values }) => {
  const maxMovingTime = Math.max(
    ...values.map((activity: any) => activity.count)
  );
  const minMovingTime = Math.min(
    ...values.map((activity: any) => activity.count)
  );
  const difference = maxMovingTime - minMovingTime;

  return (
    <div className="w-full">
      <Container>
        <HeatMap
          value={values}
          className="w-full h-64"
          weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          startDate={new Date("2023/01/01")}
          endDate={new Date()}
          rectSize={32}
          rectProps={{
            rx: 4,
          }}
          panelColors={{
            [Math.floor(minMovingTime)]: "#dcfce7",
            [Math.floor(minMovingTime + difference * 0.11)]: "#bbf7d0",
            [Math.floor(minMovingTime + difference * 0.11 * 2)]: "#86efac",
            [Math.floor(minMovingTime + difference * 0.11 * 3)]: "#4ade80",
            [Math.floor(minMovingTime + difference * 0.11 * 4)]: "#22c55e",
            [Math.floor(minMovingTime + difference * 0.11 * 5)]: "#16a34a",
            [Math.floor(minMovingTime + difference * 0.11 * 6)]: "#15803d",
            [Math.floor(minMovingTime + difference * 0.11 * 7)]: "#166534",
            [Math.floor(minMovingTime + difference * 0.11 * 8)]: "#14532d",
            [Math.floor(maxMovingTime)]: "#052e16",
          }}
          rectRender={(props, data) => {
            // if (!data.count) return <rect {...props} />;
            return (
              <Tooltip
                placement="top"
                content={`Moving Time: ${
                  secondsToHoursMinutes(data.count) || 0
                }`}
              >
                <rect {...props} />
              </Tooltip>
            );
          }}
        />
      </Container>
    </div>
  );
};

export default Heatmap;

import {Group} from "@visx/group";
import {Pie} from "@visx/shape";

const width = 380;
const height = 380;

export function PaidNotPaid({data}: any) {
  if (!data) {
    return null;
  }

  const innerWidth = width - 40;
  const innerHeight = height - 40;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + 20;
  const left = centerX + 20;

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <Pie
          data={[
            {n: 0, value: data.paidCount},
            {n: 1, value: data.notPaidCount},
          ]}
          pieValue={(d) => d.value}
          // pieSortValues={pieSortValues}
          outerRadius={radius}
          x={centerX}
          y={centerY}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const {n, value} = arc.data;
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc);
              const arcFill = n === 0 ? "#000" : "#999";
              return (
                <g key={`arc-${value}-${index}`}>
                  <path x={100} y={100} d={arcPath!} fill={arcFill} />
                  {hasSpaceForLabel && (
                    <text
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fill="#ffffff"
                      fontSize={18}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {arc.data.value} <br />
                      {arc.data.n === 0 ? "Zaplacených" : "Nezaplacených"}
                    </text>
                  )}
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}

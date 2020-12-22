import {Group} from "@visx/group";
import {Bar} from "@visx/shape";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {scaleLinear, scaleBand} from "@visx/scale";
import {getMonth} from "@/features/common/getMonth";

const width = 380;
const height = 380;

export function MonthlyCount({data}: any) {
  if (!data) {
    return null;
  }

  const xMax = width - 40;
  const yMax = height - 40;

  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: Object.keys(data.monthly).map(getMonth),
    paddingInner: 0.2,
    paddingOuter: 0,
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    zero: true,
    domain: [data.minCount, data.maxCount],
  });

  return (
    <svg width={width} height={height}>
      {Object.keys(data.monthly).map((key, index) => {
        const barWidth = xScale.bandwidth();
        const barHeight = yMax - (yScale(data.monthly[key][0]) ?? 10);
        const barX = xScale(getMonth(key));
        const barY = yMax - barHeight;

        return (
          <Group key={key}>
            <Bar
              x={(barX ?? 0) + 40}
              y={barHeight > 0 ? barY : yMax - 18}
              height={barHeight > 0 ? barHeight : 18}
              width={barWidth}
              fill="black"
            />
            <AxisLeft left={40} stroke="#999" scale={yScale} />
            <AxisBottom
              left={40}
              top={yMax}
              scale={xScale}
              stroke="#999"
              tickLabelProps={() => ({
                fill: "#000",
                fontSize: 11,
                stroke: "none",
                fontWeight: "bold",
                textAnchor: "middle",
                strokeWidth: 0,
              })}
            />
          </Group>
        );
      })}
    </svg>
  );
}

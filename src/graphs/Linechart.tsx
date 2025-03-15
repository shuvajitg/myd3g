import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataPoint {
  x: number;
  y: number;
}

interface LineChartProps {
  data: DataPoint[];
  margin?: { top: number; right: number; bottom: number; left: number };
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

const LineChart = ({
  data,
  margin,
  width,
  height,
  className,
  style,
}: LineChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    (margin = { top: 20, right: 30, bottom: 30, left: 40 }),
      (width = 600 - margin.left - margin.right),
      (height = 400 - margin.top - margin.bottom);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x) as [number, number])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)])
      .range([height, 0]);

    const line = d3
      .line<DataPoint>()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [data]);

  return <svg className={className} style={{ ...style }} ref={svgRef}></svg>;
};

export default LineChart;

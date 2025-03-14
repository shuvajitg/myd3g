import { useEffect, useRef } from "react";
import * as d3 from "d3";


interface PannableChart {
    data: { x: number; y: number }[];
    margin?: { top: number; right: number; bottom: number; left: number };
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
}

function PannableChart({ data, margin, width, height, className, style }: PannableChart) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        margin = { top: 20, right: 30, bottom: 30, left: 40 };
        width = 600 - margin.left - margin.right;
        height = 300 - margin.top - margin.bottom;

        if (!svgRef.current) return;
        const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous elements

        const chart = svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X and Y Scales
        const xScale = d3
            .scaleUtc()
            .domain([0, d3.max(data, (d) => d.x)] as [number, number])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.y)] as [number, number])
            .range([height, 0]);

        // Line generator
        const line = d3
            .area()
            .x((d: any) => xScale(d.x))
            .y1((d: any) => yScale(d.y))
            .y0(yScale(0))
            .curve(d3.curveStep);


        // Draw line path
        const path = chart
            .append("path")
            .datum(data)
            .attr("fill", "steelblue")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line as any);

        // X Axis
        const xAxis = d3.axisBottom(xScale);
        const xAxisGroup = chart
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis);

        // Y Axis
        const yAxis = d3.axisLeft(yScale);
        chart.append("g").call(yAxis);

        // Zoom and Pan Behavior
        const zoom = d3
            .zoom()
            .scaleExtent([1, 1]) // Disable zooming (keep scale 1)
            .translateExtent([
                [-width, 0],
                [2 * width, height],
            ])
            .on("zoom", (event) => {
                const { transform } = event;
                chart.attr("transform", transform); // Apply translation
            });

        svg.call(zoom as any); // Attach zoom handler to SVG

    }, []);

    return <svg className={className} ref={svgRef} style={{ border: "1px solid #ccc", ...style }}></svg>;
};

export default PannableChart;

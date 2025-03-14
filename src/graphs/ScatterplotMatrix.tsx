import { useEffect, useRef } from "react";
import * as d3 from "d3";


interface ScatterplotMatrix {
    data: { [key: string]: number }[];
    margin?: { top: number; right: number; bottom: number; left: number };
    size?: number;
    padding?: number;
    className?: string;
    style?: React.CSSProperties;
}
function ScatterplotMatrix({ data, margin, size, padding, className, style }: ScatterplotMatrix) {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        margin = { top: 20, right: 20, bottom: 20, left: 20 };
        size = 150; // Size of each cell
        padding = 20;

        const columns = Object.keys(data[0]); // Extract numeric keys
        const numCols = columns.length;
        const color = d3.scaleOrdinal()
            .domain(data.map((_, i) => i.toString()))
            .range(d3.schemeCategory10);

        const svg = d3
            .select(ref.current)
            .attr("width", size * numCols + margin.left + margin.right)
            .attr("height", size * numCols + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Create scales
        const scales: { [key: string]: d3.ScaleLinear<number, number> } = {};
        columns.forEach((col) => {
            scales[col] = d3.scaleLinear()
                .domain(d3.extent(data, (d: any) => d[col]) as [number, number])
                .range([padding, size - padding]);
        });

        // Brush function
        function brushed(event: d3.D3BrushEvent<any>) {
            const selection = event.selection;
            if (!selection) return;

            const [[x0, y0], [x1, y1]] = selection as [[number, number], [number, number]];

            d3.selectAll("circle")
                .classed("selected", (d: any) => {
                    const x = scales[d.xVar](d[d.xVar]);
                    const y = scales[d.yVar](d[d.yVar]);
                    return x >= x0 && x <= x1 && y >= y0 && y <= y1;
                });
        }

        // Draw scatterplots
        columns.forEach((xVar, i) => {
            columns.forEach((yVar, j) => {
                const g = svg.append("g")
                    .attr("transform", `translate(${i * size},${j * size})`);

                g.append("rect")
                    .attr("fill", "none")
                    .attr("stroke", "#ddd")
                    .attr("width", size)
                    .attr("height", size)

                const brush = d3.brush()
                    .extent([[0, 0], [size, size]])
                    .on("brush", brushed);

                g.append("g").attr("class", "brush").call(brush);

                g.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", (d: any) => scales[xVar](d[xVar])!)
                    .attr("cy", (d: any) => scales[yVar](d[yVar])!)
                    .attr("r", 3)
                    .attr("fill", "steelblue")
                    .attr("opacity", 0.7)
                    .attr("fill", (d: any) => color(d.C) as string)
            });
        });

    }, []);

    return <svg className={className} style={{ ...style }} ref={ref}></svg>;
};

export default ScatterplotMatrix;

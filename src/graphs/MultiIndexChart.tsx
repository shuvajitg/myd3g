import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Define the type for each stock's data point
type StockDataPoint = {
    date: string;
    value: number;
};

interface MultiIndexChart {
    data: { [key: string]: StockDataPoint[] };
    margin?: { top: number; right: number; bottom: number; left: number };
    width: number;
    height: number;
    className?: string;
    style?: React.CSSProperties;
}

function MultiIndexChart({ data, width = 700, height = 400, margin, className, style }: MultiIndexChart) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!data || Object.keys(data).length === 0) return;

        margin = { top: 30, right: 60, bottom: 40, left: 50 };

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous SVG content

        // Get stock names
        const stocks = Object.keys(data) as Array<"AMZN" | "MSFT" | "GOOG" | "IBM">;

        // Transform data to index-based values
        const indexedData = stocks.map((stock: keyof typeof data) => ({
            name: stock,
            values: data[stock as keyof typeof data].map((d: StockDataPoint) => ({
                date: new Date(d.date),
                value: d.value / data[stock][0].value, // Normalize values
            })),
        }));

        // Create scales
        const xScale = d3
            .scaleUtc()
            .domain((d3.extent(indexedData[0].values, (d: any) => d.date) as [Date | undefined, Date | undefined]).map(d => d ?? new Date()) as [Date, Date])
            .range([margin.left, width - margin.right])
            .clamp(true)

        const yScale = d3
            .scaleLinear()
            .domain([
                d3.min(indexedData.flatMap((stock) => stock.values.map((d: any) => d.value)))! - 0.2,
                d3.max(indexedData.flatMap((stock) => stock.values.map((d: any) => d.value)))! + 0.2,
            ])
            .rangeRound([height - margin.bottom, margin.top])


        // Define color scale
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(stocks);

        // Create line generator
        const line = d3
            .line<{ date: Date; value: number }>()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.value))
            .curve(d3.curveMonotoneX);

        // Add axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(6));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        // Draw lines
        indexedData.forEach((stock: any) => {
            svg.append("path")
                .datum(stock.values)
                .attr("fill", "none")
                .attr("stroke", colorScale(stock.name) as string)
                .attr("stroke-width", 2)
                .attr("d", line);

            // Add text labels
            svg.append("text")
                .attr("x", xScale(stock.values[stock.values.length - 1].date) + 5)
                .attr("y", yScale(stock.values[stock.values.length - 1].value))
                .attr("fill", String(colorScale(stock.name)))
                .attr("font-size", "12px")
                .text(stock.name);
        });
        // svg.on("mousemove touchmove", function (event) {
        //     update(x.invert(d3.pointer(event, this)[0]));
        //     d3.event.preventDefault();
        // });

    }, [data]);

    return <svg className={className} ref={svgRef} width={width} height={height} style={{ ...style }} />;
};

export default MultiIndexChart;

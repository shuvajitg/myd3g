import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";


interface BrushableScatterplotData {
    data: {
        x: number;
        y: number;
        species?: string;
    }[]
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    xDomainStart: number;
    xDomainEnd: number;
    yDomainStart: number;
    yDomainEnd: number;
    speciesValues: string[];
    colors: string[];
}

const BrushableScatterplot = ({
    data,
    width = 600,
    height = 400,
    className,
    style,
    xDomainStart,
    xDomainEnd,
    yDomainStart,
    yDomainEnd,
    speciesValues,
    colors }: BrushableScatterplotData) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [selectedPoints, setSelectedPoints] = useState<{ x: number; y: number; species: string; }[]>([]);
    const [speciesValue, setSpeciesValue] = useState<string[]>([])
    const [colorScaleState, setColorScaleState] = useState<string[]>([])

    useCallback(() => {
        setSpeciesValue(speciesValues)
        setColorScaleState(colors)
    }, [])

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous elements

        // Margins
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        // Scales
        const xScale = d3
            .scaleLinear()
            .domain([xDomainStart, xDomainEnd]) // Sepal Length range
            .range([0, plotWidth]);

        const yScale = d3
            .scaleLinear()
            .domain([yDomainStart, yDomainEnd]) // Sepal Width range
            .range([plotHeight, 0]);

        // Create chart group
        const chart = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Axes
        chart.append("g")
            .attr("transform", `translate(0,${plotHeight})`)
            .call(d3.axisBottom(xScale));

        chart.append("g").call(d3.axisLeft(yScale));

        // Color scale for species
        const colorScale = d3
            .scaleOrdinal()
            .domain(speciesValue)
            .range(colorScaleState);

        // Draw Scatterplot
        const points = chart
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d: any) => xScale(d.x))
            .attr("cy", (d: any) => yScale(d.y))
            .attr("r", 6)
            .attr("fill", (d: any) => colorScale(d?.species) as string)
            .attr("stroke", "black")
            .attr("class", "dot");

        // Brush
        const brush = d3
            .brush()
            .extent([
                [0, 0],
                [plotWidth, plotHeight],
            ])
            .on("end", (event) => {
                if (!event.selection) return;

                const [[x0, y0], [x1, y1]] = event.selection;

                // Find points within the selected brush area
                const brushedData = data.filter(
                    (d): d is { x: number; y: number; species: string } =>
                        xScale(d.x) >= x0 &&
                        xScale(d.x) <= x1 &&
                        yScale(d.y) >= y0 &&
                        yScale(d.y) <= y1 &&
                        d.species !== undefined
                );
                // console.log(brushedData);

                // Update selected points
                setSelectedPoints(brushedData);

                // Highlight selected points
                points.attr("fill", (d: { x: number; y: number; species?: string }): string =>
                    brushedData.some((point) => point.x === d.x && point.y === d.y && point?.species === d?.species) ? "orange" : colorScale(d?.species) as string
                );
            });

        // Append brush
        chart.append("g").attr("class", "brush").call(brush);
    }, [width, height]);

    return (
        <div>
            <svg className={className} ref={svgRef} width={width} height={height} style={{ border: "1px solid black", ...style }} />
            <h3>Selected Points: {selectedPoints.length}</h3>
            <ul>
                {selectedPoints.map((point, index) => (
                    <li key={index}>{`Sepal Length: ${point.x}, Sepal Width: ${point.y}, Species: ${point?.species}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default BrushableScatterplot;

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface BarchartData {
    data: { x: number; y: number }[],
    width?: number,
    height?: number,
    marginTop?: number,
    marginLeft?: number,
    marginRight?: number,
    marginBottom?: number,
    className?: string
}

function Barchart({ data, width = 928, height = 500, marginTop = 20, marginRight = 0, marginBottom = 30, marginLeft = 40, className }: BarchartData) {
    const chartRef = useRef<SVGSVGElement | null>(null)


    useEffect(() => {
        if (!data || data.length === 0) return;

        d3.select(chartRef.current).selectAll("*").remove();

        const svg = d3.select(chartRef.current)
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto;");

        const x = d3.scaleBand()
            // .domain(d3.sort(data, (d: any) => -d.y).map(d => d.x))
            .domain(data.map((d: any) => d.x))
            .range([marginLeft, width - marginRight])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, (d: any) => d.y as number) || 0])
            .nice()
            .range([height - marginBottom, marginTop]);

        const xAxis = d3.axisBottom(x).tickSizeOuter(0);
        const yAxis = d3.axisLeft(y);

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d: any) => x(d.x) ?? 0)
            .attr("y", (d: any) => y(d.y))
            .attr("height", (d: any) => {
                const height = y(0) - y(d.y);
                // console.log(`x: ${d.x}, y: ${d.y}, Height: ${height}`);
                return isNaN(height) ? 0 : height;
            })
            .attr("width", x.bandwidth());

        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(xAxis);

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(yAxis)
            .call(g => g.select(".domain").remove());

        function zoom(svg: any) {
            const extent: [[number, number], [number, number]] = [[marginLeft, marginTop], [width - marginRight, height - marginTop]];

            svg.call(d3.zoom()
                .scaleExtent([1, 8])
                .translateExtent(extent)
                .extent(extent)
                .on("zoom", zoomed));

            function zoomed(event: d3.D3ZoomEvent<SVGRectElement, unknown>) {
                x.range([marginLeft, width - marginRight].map(d => event.transform.applyX(d)));
                svg.selectAll("rect").attr("x", (d: any) => x(d.x)).attr("width", x.bandwidth());
                svg.selectAll("g.x-axis").call(xAxis);
            }
        }

        zoom(svg);
    }, [data]);


    return (
        < >
            <svg className={className} ref={chartRef}></svg>
        </>
    )
}

export default Barchart
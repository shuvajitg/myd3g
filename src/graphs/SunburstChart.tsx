import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// impliment Sequences Sunburst chart need this type of data ⬇️

interface DataNode {
    name?: string;
    value?: number;
    children?: DataNode[];
}

interface SunburstChart {
    data: DataNode;
    width: number;
    height: number;
    className?: string;
    style?: React.CSSProperties;
    text?: string;
}

function SunburstChart({ data, width = 600, height = 600, className, style, text }: SunburstChart) {
    const ref = useRef<SVGSVGElement | null>(null);
    const [hoveredData, setHoveredData] = useState<{ sequence: string[], percentage: number }>({ sequence: [], percentage: 0.0 });
    text = "Hover on chart"

    useEffect(() => {
        if (!data) return;

        const radius = width / 2;

        const partition = (data: any) =>
            d3.partition().size([2 * Math.PI, radius])(
                d3
                    .hierarchy(data)
                    .sum((d) => d.value)
                    .sort((a, b) => (b.value || 0) - (a.value || 0))
            );

        const root = partition(data);

        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

        const arc = d3
            .arc()
            .startAngle((d: any) => d.x0)
            .endAngle((d: any) => d.x1)
            .innerRadius((d: any) => d.y0)
            .outerRadius((d: any) => d.y1);

        const svg = d3
            .select(ref.current)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .style("font", "12px sans-serif");

        svg.selectAll("*").remove();
        svg.node();

        const g = svg.append("g");

        g.selectAll("path")
            .data(root.descendants().filter((d) => d.depth))
            .enter()
            .append("path")
            .attr("fill", (d) => color(d.ancestors().map((d: any) => d.data.name).join("/")))
            .attr("d", arc as unknown as string)
            .style("cursor", "pointer")
            .on("mouseenter", function (e: any, d: any) {
                d3.select(this).attr("opacity", 0.7);
                setHoveredData({
                    sequence: d.ancestors().map((d: any) => d.data.name),
                    percentage: ((d.value || 0) / (root.value || 0)) * 100,
                });
            })
            .on("mouseleave", function () {
                d3.select(this).attr("opacity", 1);
                setHoveredData({ sequence: [], percentage: 0.0 });
            });

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.5em")
            .attr("font-size", "16px")
            .attr("font-weight", "bold")
            .text(`Sunburst Chart`);

    }, [width, height]);

    return (
        <div className="relative flex flex-col items-center mt-4">
            {hoveredData.percentage > 0 ? (
                <p className="text-black rounded">
                    {hoveredData.percentage.toFixed(2)}% of visits begin with this sequence.
                </p>
            ) :
                (
                    <p>{text}</p>
                )
            }
            <svg className={className} style={{ ...style }} ref={ref} width={width} height={height}></svg>
        </div>
    );
};

export default SunburstChart;

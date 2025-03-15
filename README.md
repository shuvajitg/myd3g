## `Graph using D3`

### Type of chart abelable in this package

1. Bar Chart
2. BrushableScatterplot
3. MultiIndexChart
4. PannableChart
5. ScatterplotMatrix
6. SunburstChart
7. LineChart

### How to Use

```
npm i myd3g
```

`Bar chart`

```jsx
import {BarChart} from 'myd3g';

// must have name and value
const data = [
    { x: 3, y: 30, ... },
    { x: 6, y: 80, ... },
    { x: 5, y: 45, ... },
    { x: 4, y: 60, ... },
    { x: 2, y: 20, ... },
    {...}
]

const BarChart() => {
    return(
        <>
            {/* ....... */}
            {/* puss width height and other as you want otherwise its take default value*/}
            <BarChart
                data = {dara}
                width = {number}
                height = {number}
                marginTop = {number}
                marginLeft = {number}
                marginRight = {number}
                marginBottom = {number}
                className = {className}>
        </>
    )
}

export default BarChart
```

`BrushableScatterplot`

```jsx
import {BrushableScatterplot} from 'myd3g';

// Sample real-world data (Iris dataset - Sepal Length vs Sepal Width)
const data = [
  { sepalLength: 5.1, sepalWidth: 3.5, species: 'setosa', ... },
  { sepalLength: 4.9, sepalWidth: 3.0, species: 'setosa' , ...},
  { sepalLength: 7.0, sepalWidth: 3.2, species: 'versicolor', ... },
  {.....}
];
const BrushableScatterplot() => {
    return(
        <>
            {/* ....... */}
            {/* puss width height and other as you want otherwise its take default value*/}
            <BrushableScatterplot
                data = {dara}
                width = {number}
                height = {number}
                className = {className}
                style = {inlineCss}
                xDomainStart = {number}
                xDomainEnd = {number}
                yDomainStart = {number}
                yDomainEnd = {number}
                speciesValues = ["string", "string", ...]
                colors = ["read", "blue", ...]>
        </>
    )
}

export default BrushableScatterplot
```

`MultiIndexChart`

```jsx
import {MultiIndexChart} from 'myd3g';

const data = {
  AMZN: [
    { x: '2023-01-01', y: 100 },
    { x: '2023-02-01', y: 120 },
    { x: '2023-03-01', y: 140 },
    { x: '2023-04-01', y: 180 },
    {....}
  ],
  MSFT: [
    { x: '2023-01-01', y: 100 },
    { x: '2023-02-01', y: 110 },
    { x: '2023-03-01', y: 130 },
    { x: '2023-04-01', y: 160 },
  ],
  xyz: [
    {....}
  ]
};

const MultiIndexChart() => {
    return(
        <>
            {/* ....... */}
            {/* puss width height and other as you want otherwise its take default value*/}
            <MultiIndexChart
                data = {data}
                width = {number}
                height = {number}
                className = {className}>
        </>
    )
}

export default MultiIndexChart
```

`PannableChart`

```jsx
import {PannableChart} from 'myd3g';


const data = [
    { x: 0, y: 5 },
    { x: 1, y: 9 },
    { x: 2, y: 7.2 },
    { x: 3, y: 11 },
    { x: 4, y: 13 },
    { x: 5, y: 10.5 },
    { x: 6, y: 6 }
    {...}
];

const PannableChart() => {
    return(
        <>
            {/* ....... */}
            {/* puss width height and other as you want otherwise its take default value*/}
            <PannableChart
                data = {data}
                margin = { top: number; right: number; bottom: number; left: number }
                width = {number}
                height = {number}
                className = {className}
                style = {{style}}>
        </>
    )
}

export default PannableChart
```

`ScatterplotMatrix`

```jsx
import {ScatterplotMatrix} from 'myd3g';


const data = [
    { A: 10, B: 20, C: 30 },
    { A: 15, B: 25, C: 35 },
    { A: 20, B: 15, C: 25 },
    { A: 30, B: 10, C: 20 },
    { A: 25, B: 35, C: 10 }
];

const ScatterplotMatrix() => {
    return(
        <>
            {/* ....... */}
            {/* puss width height and other as you want otherwise its take default value*/}
            <ScatterplotMatrix
                data={data}
                margin = { top: number; right: number; bottom: number; left: number }
                size = {number}
                padding = {number}
                className = {className}
                style = {{style}}>
        </>
    )
}

export default ScatterplotMatrix

```

`SunburstChart`

```jsx
import {SunburstChart} from 'myd3g';


const data = {
    name: "root",
    children: [
        {
            name: "Category A",
            children: [
                { name: "Sub A1", value: 100 },
                { name: "Sub A2", value: 80 },
                {
                    children: [
                        { name: "Sub A1", value: 10 },
                        { name: "Sub A2", value: 20 },
                        { name: "Sub A3", value: 30 },
                        { name: "Sub A4", value: 40 },
                    ],
                }
            ],
        },
        {
            name: "Category B",
            children: [
                { name: "Sub B1", value: 50 },
                { name: "Sub B2", value: 60 },
            ],
        },
        {
            name: "Category C",
            children: [
                { name: "Sub C1", value: 70 },
                { name: "Sub C2", value: 30 },
                { name: "Sub C3", value: 40 },
                {
                    children: [
                        { name: "Sub C1", value: 90 },
                        { name: "Sub C2", value: 40 },
                        { name: "Sub C3", value: 20 },
                        { name: "Sub C4", value: 10 },
                    ],
                }
            ],
        },
        {
            name: "Category D",
            children: [
                { name: "Sub D1", value: 20 },
                { name: "Sub D2", value: 40 },
                { name: "Sub D3", value: 60 },
            ],
        }
    ],
};


const SunburstChart() => {
    return(
        <>
            {/* ....... */}
            {/* puss width height and other as you want otherwise its take default value*/}
            <SunburstChart
                data={data}
                width = {number}
                height = {number}
                className = {className}
                style = {{style}}
                text = {`Hover on chart`}>
        </>
    )
}

export default SunburstChart

```

`LineChart`

```jsx
import {LineChart} from 'myd3g';


const sampleData = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 15 },
    { x: 3, y: 25 },
    {...}
];

const SunburstChart() => {
    return(
        <>
            {/* ....... */}
            {/* puss width height and other as you want otherwise its take default value*/}
            <SunburstChart
                data = {data}
                margin = { top: number; right: number; bottom: number; left: number }
                width = {number}
                height = {number}
                className = {className}
                style = {{style}}>
        </>
    )
}

export default SunburstChart
```

## `Graph using D3`

### Type of chart abelable in this package

1. Bar Chart
2. BrushableScatterplot
3. Scatter Chart
4. Pannable Chart
5. MultiIndex Chart

### How to Use

`Bar chart`

```jsx
import BarChart from 'myd3g';

// must have name and value
const data = [
    { name: "A", value: 30, ... },
    { name: "B", value: 80, ... },
    { name: "C", value: 45, ... },
    { name: "D", value: 60, ... },
    { name: "E", value: 20, ... },
    {...}
]

const chart = BarChart()=>{
    return(
        <>
            {/* ....... */}
            {/* puss width height and other as you want otherwise its take default value*/}
            <BarChart data={dara} width={number} height={number} marginTop={number} marginRight={number} marginBottom={number} marginLeft={number}>
        </>
    )
}
```

`BrushableScatterplot`

```jsx
import BarChart from 'myd3g';

// Sample real-world data (Iris dataset - Sepal Length vs Sepal Width)
const data = [
  { sepalLength: 5.1, sepalWidth: 3.5, species: 'setosa', ... },
  { sepalLength: 4.9, sepalWidth: 3.0, species: 'setosa' , ...},
  { sepalLength: 7.0, sepalWidth: 3.2, species: 'versicolor', ... },
  {.....}
];
const chart = BrushableScatterplot()=>{
    return(
        <>
            {/* ....... */}
            {/* puss width height and other as you want otherwise its take default value*/}
            <BrushableScatterplot data={dara} width={number} height={number} >
        </>
    )
}
```

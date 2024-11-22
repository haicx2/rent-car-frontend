import useColorMapping from "../hook/ColorMapping.js";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import data from "bootstrap/js/src/dom/data.js";

export default function CustomPieChart({
                                           data,
                                           dataKey = "value",
                                           nameKey = "name",
                                           width = "80%",
                                           height = 400,
                                       }) {
    const colors = useColorMapping();

    return (
        <section className="mb-5 mt-5">
            <h4 className='text-center mt-4'>Appointment Overview</h4>
            <ResponsiveContainer width={width} height={height}>
                <PieChart className="mt-4">
                    <Pie
                        dataKey={dataKey}
                        data={data}
                        label={({ [nameKey]: name }) => name}
                    >
                        {data &&
                            data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[entry.name] || colors.default} // Fallback to default color
                                />
                            ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout='vertical' />
                </PieChart>
            </ResponsiveContainer>
        </section>
    )
}
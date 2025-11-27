import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const EmployeesChart = () => {
  const data = [
    { date: '2 Jan', value: 180 },
    { date: '31 Jan', value: 200 },
    { date: '22 Feb', value: 190 },
    { date: '16 Mar', value: 210 },
    { date: '05 Apr', value: 220 },
    { date: '26 Apr', value: 240 },
    { date: '17 May', value: 250 },
    { date: '08 Jun', value: 260 },
    { date: '29 Jun', value: 245 },
    { date: '20 Jul', value: 255 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Employees Info</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeesChart;
// src/components/PieChart.jsx
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip } from 'recharts';

interface PieChartProps {
  stats: {
    todo: number;
    inProgress: number;
    done: number;
    blocked: number;
  };
}

const COLORS = {
  todo: '#6B7280', // gri
  inProgress: '#3B82F6', // albastru
  done: '#10B981', // verde
  blocked: '#EF4444', // roșu
};

const PieChart: React.FC<PieChartProps> = ({ stats }) => {
  const data = Object.entries(stats).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  return (
    <RechartsPieChart width={120} height={120}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={60}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
        ))}
      </Pie>
      <Tooltip 
        contentStyle={{
          backgroundColor: '#1F2937', 
          border: 'none', 
          color: '#F9FAFB', 
          borderRadius: '8px'
        }}
        itemStyle={{ color: '#F9FAFB' }}
      />
    </RechartsPieChart>
  );
};

export default PieChart;
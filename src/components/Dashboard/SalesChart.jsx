import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useFetch } from '../../hooks/useFetch';

const colors = [
  '#3b82f6',
  '#8b5cf6',
  '#10b981',
  '#f59e8b',
  '#ef4444',
  '#06b6d4',
  '#84cc16',
  '#ec4899',
]

function SalesChart() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.products) {
      const grouped = {}

      data.products.forEach((product) => {
        const category = product.category
        if (!grouped[category]) {
          grouped[category] = 0
        }
        grouped[category] += 1
      })

      const formattedData = Object.entries(grouped)
      .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length],
      }))
      .slice(0, 6)

      setChartData(formattedData)
    }
  }, [data]);

  if (loading) {
    return (
      <div className="animate-pulse flex space-x-4 p-4">
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
  </div>
    )
  };

  if (error) return <p className='text-red-500 p-6'>Erro: {error}</p>

  return (
    <div className='bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl p-6 border border-transparent shadow-md shadow-slate-300/40 dark:shadow-none dark:border-slate-700/50'>
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-800 dark:text-white'>
          Sales by Category
        </h3>
        <p className='text-sm text-slate-500 dark:text-slate-400'>
          Product categories from API
        </p>
      </div>

      <div className='h-48'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.9)',
              borderColor: 'rgba(51, 65, 65, 0.5)',
              color: '#fff',
              borderRadius: '8px',
            }}
            itemStyle={{ color: '#e2e8f0'}}
             />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='space-y-3'>
        {chartData.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between'
          >
            <div className='flex items-center space-x-3'>
              <div
                className='w-3 h-3 rounded-full'
                style={{
                  backgroundColor: item.color,
                }}
              />
              <span className='text-sm text-slate-600 dark:text-slate-400'>
                {item.name}
              </span>
            </div>

            <div className='text-sm font-semibold text-slate-800 dark:text-white'>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SalesChart
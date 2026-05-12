import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useFetch } from '../../hooks/useFetch';

function RevnueChart() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");
  const [chartData, setChartData ] = useState([]);

  useEffect(() => {
    if(data && data.products) {
      const grouped = {}

      data.products.forEach((product) => {
        const category = product.category

        if (!grouped[category]) {
          grouped[category] = {
            month: category,
            revenue: 0,
            expenses: 0,
          }
        }

        grouped[category].revenue += product.price
        grouped[category].expenses += product.stock * 10
      })

      const formattedData = Object.values(grouped).slice(0, 8)
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

  if (error) {
    return (
      <div className='bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6'>
        <p className='text-red-500'>Error: {error}</p>
      </div>
    )
  };

  return (
    <div className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-transparent shadow-md shadow-slate-300/40 dark:shadow-none dark:border-slate-700/50 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-xl font-bold text-slate-800 dark:text-white'>
            Revenue by Category
          </h3>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Data loaded from API
          </p>
        </div>
      </div>

      <div className='h-80'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.3}
            />

            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.9)',
              borderColor: 'rgba(51, 65, 65, 0.5)',
              color: '#fff',
              borderRadius: '8px',
            }}
            itemStyle={{ color: '#e2e8f0'}}
            />

            <Bar
              dataKey="revenue"
              fill="url(#revenueGradient)"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              fill="url(#expensesGradient)"
              radius={[4, 4, 0, 0]}
            />

            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>

              <linearGradient
                id="expensesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevnueChart
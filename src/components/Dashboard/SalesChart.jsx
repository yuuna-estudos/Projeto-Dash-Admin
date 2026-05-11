import React, { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

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
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products')

        if (!response.ok) {
          throw new Error('Erro ao buscar categorias')
        }

        const result = await response.json()

        const grouped = {}

        result.products.forEach((product) => {
          const category = product.category

          if (!grouped[category]) {
            grouped[category] = 0
          }

          grouped[category] += 1
        })

        const chartData = Object.entries(grouped)
          .map(([name, value], index) => ({
            name,
            value,
            color: colors[index % colors.length],
          }))
          .slice(0, 6)

        setData(chartData)
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSalesData()
  }, [])

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6">
        <p className="text-slate-500 dark:text-slate-400">
          Loading chart...
        </p>
      </div>
    )
  }

  return (
    <div className='bg-white dark:bg-slate-900 backdrop-blur-xl rounded-b-2xl p-6 border border-transparent shadow-md shadow-slate-300/40 dark:shadow-none dark:border-slate-700/50'>
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
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='space-y-3'>
        {data.map((item, index) => (
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
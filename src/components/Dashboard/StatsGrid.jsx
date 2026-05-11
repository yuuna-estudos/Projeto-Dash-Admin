import {
  ArrowUpRight,
  ShoppingCart,
  DollarSign,
  Users,
  Eye,
  ArrowDownRight,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

function StatsGrid() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, usersRes, cartsRes] = await Promise.all([
          fetch('https://dummyjson.com/products'),
          fetch('https://dummyjson.com/users'),
          fetch('https://dummyjson.com/carts'),
        ])

        const productsData = await productsRes.json()
        const usersData = await usersRes.json()
        const cartsData = await cartsRes.json()

        const totalRevenue = productsData.products.reduce(
          (sum, product) => sum + product.price,
          0
        )

        const generatedStats = [
          {
            title: 'Total Revenue',
            value: `$${Math.round(totalRevenue).toLocaleString()}`,
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'from-emerald-500 to-teal-600',
            bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
            textColor: 'text-emerald-600 dark:text-emerald-400',
          },
          {
            title: 'Active Users',
            value: usersData.total.toLocaleString(),
            change: '+8.2%',
            trend: 'up',
            icon: Users,
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            textColor: 'text-blue-600 dark:text-blue-400',
          },
          {
            title: 'Total Orders',
            value: cartsData.total.toLocaleString(),
            change: '+15.3%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            textColor: 'text-purple-600 dark:text-purple-400',
          },
          {
            title: 'Page Views',
            value: (productsData.total * 100).toLocaleString(),
            change: '-2.1%',
            trend: 'down',
            icon: Eye,
            color: 'from-orange-500 to-red-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            textColor: 'text-orange-600 dark:text-orange-400',
          },
        ]

        setStats(generatedStats)
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error)
      }
    }

    fetchStats()
  }, [])

  if (stats.length === 0) {
    return (
      <div className="text-slate-500 dark:text-slate-400">
        Loading statistics...
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 '>
      {stats.map((stat, index) => (
        <div
          key={index}
          className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6  border border-transparent shadow-md shadow-slate-300/40 dark:shadow-none dark:border-slate-700/50'
        >
          <div className='flex items-start justify-between '>
            <div className='flex-1 '>
              <p className='text-sm font-medium text-slate-600 dark:text-slate-400 mb-2'>
                {stat.title}
              </p>
              <p className='text-3xl font-bold text-slate-800 dark:text-white mb-4'>
                {stat.value}
              </p>
              <div className='flex items-center space-x-2'>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className='w-4 h-4 text-emerald-500' />
                ) : (
                  <ArrowDownRight className='w-4 h-4 text-red-500' />
                )}
                <span
                  className={`text-sm font-semibold ${
                    stat.trend === 'up'
                      ? 'text-emerald-500'
                      : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </span>
                <span className='text-sm text-slate-500 dark:text-slate-400'>
                  vs Last month
                </span>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-all duration-300`}
            >
              <stat.icon
                className={`w-6 h-6 ${stat.textColor}`}
              />
            </div>
          </div>

          <div className='mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden'>
            <div
              className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-100`}
              style={{
                width: stat.trend === 'up' ? '75%' : '45%',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
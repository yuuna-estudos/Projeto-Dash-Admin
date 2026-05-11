import {
  Clock,
  User,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

function ActivityFeed() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)

        const response = await fetch('https://dummyjson.com/users')

        if (!response.ok) {
          throw new Error('Erro ao buscar atividades')
        }

        const data = await response.json()

        const generatedActivities = data.users
          .slice(0, 5)
          .map((user, index) => ({
            id: user.id,
            icon: User,
            title: 'New user registered',
            description: `${user.firstName} ${user.lastName} created an account`,
            time: `${index + 1} hour${index === 0 ? '' : 's'} ago`,
            color: 'text-blue-500',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          }))

        setActivities(generatedActivities)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-md shadow-slate-300/40 dark:shadow-none dark:border dark:border-slate-700/50'>
      <div className='p-6 border-b border-slate-300/60 dark:border-slate-700/50'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-bold text-slate-500 dark:text-white'>
              Activity Feed
            </h3>
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              Recent System Activities
            </p>
          </div>
          <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
            View All
          </button>
        </div>
      </div>

      <div className='p-6'>
        {loading && (
          <p className='text-slate-500 dark:text-slate-400'>
            Loading activities...
          </p>
        )}

        {error && (
          <p className='text-red-500'>
            Error: {error}
          </p>
        )}

        {!loading && !error && (
          <div className='space-y-4'>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className='flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'
              >
                <div
                  className={`p-2 rounded-lg ${activity.bgColor}`}
                >
                  <activity.icon
                    className={`w-4 h-4 ${activity.color}`}
                  />
                </div>

                <div className='flex-1 min-w-0'>
                  <h4 className='text-sm font-semibold text-slate-800 dark:text-white'>
                    {activity.title}
                  </h4>

                  <p className='text-sm text-slate-600 dark:text-slate-400 truncate'>
                    {activity.description}
                  </p>

                  <div className='flex items-center space-x-1 mt-1'>
                    <Clock className='w-3 h-3 text-slate-400' />
                    <span className='text-xs text-slate-500 dark:text-slate-400'>
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityFeed
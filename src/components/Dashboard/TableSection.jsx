import { MoreHorizontal, TrendingDown, TrendingUp, Users, SearchX } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch';


function TableSection({searchTerm}) {
  const { data: productsData, loading: productsLoading, error: productsError} = useFetch("https://dummyjson.com/products");
  const { data: cartsData, loading: cartsLoading, error: cartsError } = useFetch("https://dummyjson.com/carts");
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  
useEffect(() => {
  if (productsData && productsData.products) {
    setProducts(productsData.products.slice(0, 4));
  }
}, [productsData]);

useEffect(() => {
  if (cartsData && cartsData.carts) {
    const formattedOrders = cartsData.carts.slice(0, 10).map((cart) => ({
      id: `${cart.id}`,
      customer: `Customer ${cart.userId}`,
      product: cart.products[0]?.title || "Unknown Product",
      amount: `${cart.total}`,
      status: ["completed", "pending", "cancelled"][
        Math.floor(Math.random() * 3)
      ],
      date: "2026-05-11",
    }))
    setOrders(formattedOrders)
  }
}, [cartsData]);


    const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
  }
}

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.product.toLowerCase() .includes(searchTerm.toLowerCase()) ||
            order.id.includes(searchTerm);
        
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });
  return (
    <div className='space-y-6'>
        { /* Recent Order */}
        <div className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl shadow-md shadow-slate-300/40 dark:shadow-none dark:border dark:border-slate-700/50 overflow-hidden'> 
            <div className='p-6 border-b border-slate-300/60 dark:border-slate-700/50'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className='md:flex-1'>
                <h3 className='text-lg font-bold text-slate-800 dark:text-white'>Recent Orders</h3>
                <p className='text-sm text-slate-500 dark:text-slate-400'>{searchTerm ? `Results for "${searchTerm}"` : 'Latest customer orders'}</p>
            </div>
            {/* Botões de filtro por status */}
            <div className='flex items-center overflow-x-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-full md:w-auto shrink-0 custom-scrollbar'>
                {['all', 'completed', 'pending', 'cancelled'].map((status)=>(

                <button key={status}
                onClick={() => setStatusFilter(status)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    statusFilter === status
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
                ))}
              </div>

              <div className='md:flex-1 md:text-right'>
                <button className='text-blue-600 hover:text-blue-700 text-sm font-medium '>View All</button>
            </div>
            
            </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr>
                            <th className='p-4 text-sm font-semibold text-slate-600 whitespace-nowrap'>Order ID</th>
                            <th className='p-4 text-sm font-semibold text-slate-600'>Product</th>
                            {/* Oculto no mobile, aparece a partir de tablets (md) */}
                            <th className='hidden md:table-cell p-4 text-sm font-semibold text-slate-600'>Amount</th>
                            <th className='p-4 text-sm font-semibold text-slate-600'>Status</th>
                            {/* Oculto no celular minúsculo, aparece a partir do tamanho 'sm' */}
                            <th className='hidden sm:table-cell p-4 text-sm font-semibold text-slate-600'>Date</th>
                            <th className='p-4'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className='border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors'>
                                    <td className='p-4 text-sm font-medium text-blue-600 whitespace-nowrap'>{order.id}</td>
                                    
                                    {/* Truncamos o texto do produto se for muito grande no mobile */}
                                    <td className='p-4 text-sm text-slate-800 dark:text-white max-w-[120px] sm:max-w-none truncate' title={order.product}>
                                        {order.product}
                                    </td>
                                    
                                    <td className='hidden md:table-cell p-4 text-sm text-slate-800 dark:text-white font-medium'>{order.amount}</td>
                                    
                                    <td className='p-4'>
                                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    
                                    <td className='hidden sm:table-cell p-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap'>{order.date}</td>
                                    
                                    <td className='p-4 text-right'>
                                        <MoreHorizontal className='w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600' />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-12 text-center text-slate-500">
                                    No orders found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Top Products */}
        <div className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-md shadow-slate-300/40 dark:shadow-none dark:border dark:border-slate-700/50 overflow-hidden'>
            <div className='p-6 border-b border-slate-300/60 dark:border-slate-700/50'>
                <div className='flex items-center justify-between'>
                    <div className='text-lg font-bold text-slate-800 dark:text-white'>
                        <h3 className='text-lg font-bold text-slate-800 dark:text-white'>Top Products</h3>
                    </div>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                            best performing products
                    </p>
                </div>
                <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>View All</button>
            </div>

            {/* Dynamic Data */}
            <div className='p-6 space-y-4'>
              {productsLoading && (
                <div className="animate-pulse flex space-x-4 p-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
              )}
              {productsError && (
                <p className='text-red-500'>Error: {error}</p>
              )}  
                {!productsLoading && !productsError &&
                products.map((product)=>{
                    return <div key={product.id} className='flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors'>
                <div className='flex-1'>
                    <h4 className='text-sm font-semibold text-slate-800 dark:text-white'>{product.title}</h4>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>{product.stock} units in stock</p>
                </div>
                    <div className='text-right'>
                        <p className='text-sm font-semibold text-slate-800 dark:text-white'>{product.price}</p>
                        <div className='flex items-center space-x-1'>
                            {product.trend === "up" ? <TrendingUp className='w-3 h-3 text-emerald-500'/> : (
                                <TrendingDown className='w-3 h-3 text-red-500' />
                                )}
                            <span className={`text-xs font-medium ${product.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>{product.rating}</span>
                        </div>
                    </div>
                </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default TableSection
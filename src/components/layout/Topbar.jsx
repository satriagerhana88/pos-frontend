const Topbar = () => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Admin</span>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </header>
  )
}

export default Topbar

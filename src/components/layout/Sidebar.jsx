import { RiHome9Line, RiShoppingBag3Line, RiStore2Line, RiBarChart2Line, RiUser3Line, RiLogoutBoxLine } from 'react-icons/ri'
import { MdPointOfSale } from 'react-icons/md'
import Logo from '../../assets/image/Logo.svg'
import { Link, useLocation } from 'react-router-dom'
import { BsBox, BsBox2Fill } from 'react-icons/bs'

const Sidebar = ({onLogout}) => {
  const location = useLocation()

  const menus = [
    { name: 'Home', icon: <RiHome9Line size={20} />, path: '/' },
    { name: 'POS', icon: <MdPointOfSale size={20} />, path: '/pos' },
    { name: 'Product', icon: <RiShoppingBag3Line size={20} />, path: '/products' },
    { name: 'Branch', icon: <RiStore2Line size={20} />, path: '/branch' },
    { name: 'Report', icon: <RiBarChart2Line size={20} />, path: '/reports' },
    { name: 'Stock', icon: <BsBox  size={20} />, path: '/stock-opname' },
    { name: 'User', icon: <RiUser3Line size={20} />, path: '/users' },
  ]

  return (
    <aside className="w-[90px] bg-white flex flex-col justify-between items-center py-2 shadow-md">
      <img src={Logo} alt="Logo" className="w-10" />

      <nav className="flex flex-col gap-2 w-full">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path
          return (
            <Link
              key={menu.name}
              to={menu.path}
              className={`relative overflow-hidden text-xs text-[var(--color-gray-dark)] 
                          bg-transparent w-full py-2 flex flex-col items-center gap-0.5 
                          transition-colors duration-500 ease-in-out 
                          group ${isActive ? 'text-[var(--color-primary)]' : ''}`}
            >
              {/* Background animasi */}
              <span
                className={`absolute inset-0 bg-[#FFF3ED] 
                            transition-transform duration-300 ease-out origin-left 
                            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
              />

              {/* Isi konten */}
              <span className="relative flex flex-col items-center gap-0.5 z-10">
                {menu.icon}
                {menu.name}
              </span>
            </Link>
          )
        })}
      </nav>

      <button
        onClick={onLogout}
        className="relative overflow-hidden text-xs text-[var(--color-gray-dark)] 
                   bg-transparent w-full py-2 flex flex-col items-center gap-0.5 
                   transition-colors duration-500 ease-in-out group hover:text-[#d32f2f]"
      >
        {/* Background hover */}
        <span
          className="absolute inset-0 bg-[#FFECEC] 
                     scale-x-0 origin-left transition-transform duration-300 ease-out 
                     group-hover:scale-x-100"
        />
        {/* Isi konten */}
        <span className="relative flex flex-col items-center gap-0.5 z-10">
          <RiLogoutBoxLine size={20} />
          Logout
        </span>
      </button>
    </aside>
  )
}

export default Sidebar

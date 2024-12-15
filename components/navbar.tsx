import Link from "next/link";  // Pastikan menggunakan Link dari next
import { FaHome, FaCalendarAlt, FaBus, FaMapMarkerAlt, FaUserAlt, FaWarehouse, FaMapMarkedAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-full mx-auto flex justify-between items-center">
        
        {/* Logo atau Brand (Kiri) */}
        <div className="flex items-center space-x-4 ml-6">
            <div className="col">
                <div className="text-white row font-bold text-2xl">
                    <Link href="/">TBUS</Link>
                </div> 
                <div>
                    <div className="row text-sm text-white">
                        <Link href="/">
                            Data Management Page
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Menu (Tengah) */}
        <div className="flex space-x-6 items-center">
          <Link href="/">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center space-x-2">
              <FaHome className="text-xl" />
              <span>Dashboard</span>
            </span>
          </Link>
          <Link href="/terminal">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center space-x-2">
              <FaMapMarkerAlt className="text-xl" />
              <span>Terminal</span>
            </span>
          </Link>
          <Link href="/rute">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center space-x-2">
              <FaMapMarkedAlt className="text-xl" />
              <span>Rute Perjalanan</span>
            </span>
          </Link>
          <Link href="/bus">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center space-x-2">
              <FaBus className="text-xl" />
              <span>Bus</span>
            </span>
          </Link>
          <Link href="/fasilitas">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center space-x-2">
              <FaWarehouse className="text-xl" /> {/* Ganti ikon dengan FaWarehouse atau ikon lain yang relevan */}
              <span>Fasilitas</span>
            </span>
          </Link>
          <Link href="/user">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center space-x-2">
              <FaUserAlt className="text-xl" />
              <span>User</span>
            </span>
          </Link>
        </div>

        {/* Admin (Kanan) */}
        <div className="flex items-center space-x-4 mr-6">  
          <span className="text-white">Username</span>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
            <span>A</span> 
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

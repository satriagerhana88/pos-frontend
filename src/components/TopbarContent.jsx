import { useEffect, useState } from "react";
import axios from "axios";
import { BiBell, BiSearch } from "react-icons/bi";

const TopbarContent = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return;

    setUser(userData);
    fetchNotifications(userData);

    // auto refresh setiap 5 detik
    const interval = setInterval(() => {
      fetchNotifications(userData);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async (userData) => {
    try {
      if (!userData) return;
      const role = userData.role;
      const branchId = userData.branch_id;

      let url = `http://localhost:5000/api/notifications`;
      if (role !== "SUPER_ADMIN") {
        url += `?branch_id=${branchId}`;
      }

      const res = await axios.get(url);
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <div className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Welcome Text */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Welcome,{" "}
          <span className="text-orange-500">{user?.name || "User"}</span> 👋
        </h2>
        <p className="text-sm text-gray-500">
          {user?.role === "SUPER_ADMIN"
            ? "Super Admin Dashboard"
            : `${user?.branch_name || "Branch"} Dashboard`}
        </p>
      </div>

      {/* Middle: Search */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-[#EFF2F7] rounded-[10px] px-4 py-2 w-1/3 focus-within:ring-2 focus-within:ring-orange-300 transition"
      >
        <BiSearch size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search product, customer, or invoice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent ml-2 w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
      </form>

      {/* Right: Notification */}
      <div className="relative">
        <button
          onClick={() => setShowNotif((prev) => !prev)}
          className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <BiBell className="text-gray-600" size={22} />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1">
              {notifications.length}
            </span>
          )}
        </button>

        {showNotif && (
          <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50 border">
            <div className="p-3 border-b font-semibold text-gray-700 bg-gray-50">
              Notifications ({notifications.length})
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n, i) => (
                  <div
                    key={i}
                    className="p-3 border-b hover:bg-gray-50 text-sm text-gray-700 transition"
                  >
                    <span className="font-medium">{n.title}</span>
                    <p className="text-xs text-gray-500">{n.message}</p>
                    <p className="text-[10px] text-gray-400 italic mt-1">
                      {new Date(n.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No notifications 🎉
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopbarContent;

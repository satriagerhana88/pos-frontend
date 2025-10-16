import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BiBell, BiSearch } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";

const WS_URL = "ws://localhost:5000"; // sesuaikan dengan server WS-mu

const TopbarContent = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const wsRef = useRef(null);

  // Fetch unread notifications via REST
  const fetchNotifications = async (userData) => {
    try {
      if (!userData) return;
      const { role, branch_id } = userData;
      let url = "http://localhost:5000/api/notifications/unread";
      if (role !== "SUPER_ADMIN") url += `?branch_id=${branch_id}`;
      const res = await axios.get(url);
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // Mark notification as read
  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Init WebSocket connection
  const initWebSocket = (userData) => {
    if (!userData) return;
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received WS message:", data);
        // Tambahkan notif baru ke state
        setNotifications((prev) => [data, ...prev]);
      } catch (err) {
        console.error("WS message parse error:", err);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected, retrying in 3s...");
      // Auto-reconnect
      setTimeout(() => initWebSocket(userData), 3000);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      ws.close();
    };
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return;

    setUser(userData);
    fetchNotifications(userData);
    initWebSocket(userData);

    const interval = setInterval(() => fetchNotifications(userData), 5000);
    return () => {
      clearInterval(interval);
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className="w-full flex flex-row justify-between sticky top-0 z-40 gap-2">
      {/* Left: Welcome Text */}
      <div className="w-1/2">
        <h2 className="text-lg text-gray-800">
          Welcome,{" "}
          <span className="text-text-black font-bold">{user?.name || "User"}</span>
        </h2>
        <p className="text-sm text-gray-500">
          {user?.role === "SUPER_ADMIN"
            ? "Founder Nuevanesia"
            : `${user?.branch_name || "Branch"} Dashboard`}
        </p>
      </div>

      {/* Right: Notification */}
      <div className="flex flex-row items-center justify-end gap-2 w-1/2 mb-10">
        <div className="relative">
          <button
            onClick={() => setShowNotif((prev) => !prev)}
            className="relative bg-gray p-2 rounded hover:bg-primary transition cursor-pointer text-gray-dark hover:text-white"
          >
            <BiBell size={22} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
              <div className="p-3 font-semibold text-text-black bg-gray-300">
                Notifications ({notifications.length})
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <div
                      key={i}
                      onClick={() => handleMarkAsRead(n.id)}
                      className="p-3 border-b hover:bg-gray-50 text-sm text-gray-700 transition cursor-pointer"
                    >
                      <span className="font-medium text-gray-800">{n.title}</span>
                      <p className="text-xs text-gray-500">{n.message}</p>
                      <p className="text-[10px] text-gray-400 italic mt-1">
                        {new Date(n.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopbarContent;

import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        const userDataParsed = {
          name: userData.name,
          role: userData.role || "User",
          avatar: "/avatar.png",
        };
        setUser(userDataParsed);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const getTitle = () => {
    if (location.pathname.includes("/product/")) {
      return "Product Detail";
    }
    return "Product List";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          variant="dashboard"
          title={getTitle()}
          onSearch={setSearchQuery}
          user={user}
        />

        <main className="flex-1 px-6 md:px-10 py-6">
          <div className="mb-6 flex items-center justify-between"></div>

          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

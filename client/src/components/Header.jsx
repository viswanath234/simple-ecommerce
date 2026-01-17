import indiaFlag from "../assets/flag.svg";

const Header = ({ variant = "auth", title, onSearch, user }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="flex items-center justify-between px-6 md:px-12 h-16">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {variant === "auth" && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-3xl">FITZDO</span>
              <span className="text-xs text-gray-500">& BUSINESS</span>
            </div>
          )}

          {variant === "dashboard" && (
            <h1 className="text-xl font-semibold">{title}</h1>
          )}

          {/* Search only on dashboard */}
          {variant === "dashboard" && (
            <input
              type="text"
              placeholder="Search for products..."
              onChange={(e) => onSearch(e.target.value)}
              className="ml-6 px-4 py-2 border rounded-full w-96"
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm text-gray-700">
          {/* Auth header items */}
          {variant === "auth" && (
            <>
              <div className="flex items-center gap-1 cursor-pointer">
                <img src={indiaFlag} alt="India flag" className="w-5" />
                <span>IN</span>
              </div>

              <div className="flex items-center gap-1 cursor-pointer">
                <span>🌐</span>
                <span>EN</span>
              </div>

              <div className="flex items-center gap-1 text-gray-600">
                <span>Fitzdo is Secure</span>
                <span>🔒</span>
              </div>
            </>
          )}

          {/* Dashboard header items */}
          {variant === "dashboard" && user && (
            <div className="flex items-center gap-3">
              <div className="text-right text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <img
                src={user.avatar}
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Trophy,
  Settings,
  Network,
  LogOut,
  BrainCircuit,
Database,
Globe,
Bot,
Blocks,
UserCircle
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

 const links = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "DSA Sheet", path: "/topics", icon: Code2 },
  { name: "System Design", path: "/system-design", icon: Network },
  { name: "AI", path: "/ai", icon: BrainCircuit },
  { name: "DBMS", path: "/dbms", icon: Database },
   { name: "OOPs", path: "/oops", icon: Blocks },
  // { name: "Computer Networks", path: "/cn", icon: Globe },
  // { name: "AI Assistant", path: "/ai-assistant", icon: Bot },
  // { name: "My Progress", path: "/progress", icon: BookOpen },
  // { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
  // { name: "Settings", path: "/settings", icon: Settings },
  { name: "My Profile", path: "/profile", icon: UserCircle },
];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">
        Algo<span>Simplified</span>
      </h2>

      <nav>
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;

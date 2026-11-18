
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Trophy,
  Settings,
  Network
} from "lucide-react";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "DSA Sheet", path: "/topics", icon: Code2 },
    {name:"System Design", path: "/system-design", icon: Network},
    { name: "My Progress", path: "/progress", icon: BookOpen },
    { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
    { name: "Settings", path: "/settings", icon: Settings }
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">Algo<span>Simplified</span></h2>

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
    </aside>
  );
};

export default Sidebar;


import { Code2, Trophy, Target, Flame } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Problems Solved", value: "0", icon: Code2 },
    { title: "Total Score", value: "0", icon: Trophy },
    { title: "Completion", value: "0%", icon: Target },
    { title: "Current Streak", value: "0 Days", icon: Flame }
  ];

  return (
    <div className="dashboard">
      <div className="welcome">
        <h1>Welcome to AlgoSimplified 👋</h1>
        <p>Your DSA journey starts here. Keep learning and keep growing!</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-icon">
                <Icon size={22} />
              </div>
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
            </div>
          );
        })}
      </div>

      <div className="progress-section">
        <h2>Your Learning Journey</h2>
        <p>Start solving problems to track your progress here.</p>
      </div>
    </div>
  );
};

export default Dashboard;

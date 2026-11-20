
import { useEffect, useState } from "react";
import axios from "axios";
import { Code2, Trophy, Target, Flame } from "lucide-react";
import './Dashboard.css'
import ActivityHeatmap from "../components/ActivityHeatmap";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    problemsSolved: 0,
    totalScore: 0,
    completion: 0,
    difficulty: {
      easy: 0,
      medium: 0,
      hard: 0
    },
    recentActivity: [],
currentStreak: 0,
longestStreak: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/progress/dashboard-stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setDashboardData(response.data);
      } catch (error) {
        console.error("Dashboard API error:", error);
        setError("Unable to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const stats = [
    {
      title: "Problems Solved",
      value: dashboardData.problemsSolved,
      icon: Code2
    },
    {
      title: "Total Score",
      value: dashboardData.totalScore,
      icon: Trophy
    },
    {
      title: "Completion",
      value: `${dashboardData.completion}%`,
      icon: Target
    },
   {
  title: "Current Streak",
  value: `${dashboardData.currentStreak} ${
    dashboardData.currentStreak === 1 ? "Day" : "Days"
  }`,
  icon: Flame,
  className: "streak-flame"
}
  ];

  return (
    <div className="dashboard">
      <div className="welcome">
        <h1>Welcome to AlgoSimplified 👋</h1>
        <p>Your DSA journey starts here. Keep learning and keep growing!</p>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="stats-grid">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="stat-card" key={stat.title}>
                  <div className={`stat-icon ${stat.className || ""}`}>
  <Icon size={25} />
</div>
                  <p>{stat.title}</p>
                  <h2>{stat.value}</h2>
                </div>
              );
            })}
          </div>

          <div className="progress-section">
            <h2>Your Learning Journey</h2>

            <p>Easy: {dashboardData.difficulty.easy}</p>
            <p>Medium: {dashboardData.difficulty.medium}</p>
            <p>Hard: {dashboardData.difficulty.hard}</p>
          </div>
          <div className="recent-activity">
          <ActivityHeatmap />
  <h2>Recent Activity</h2>

  {dashboardData.recentActivity.length === 0 ? (
    <p>No problems solved yet. Start solving!</p>
  ) : (
    dashboardData.recentActivity.map((activity, index) => (
      <div className="activity-card" key={index}>
        <div className="activity-info">
          <h3>{activity.title}</h3>
          <p>
            {new Date(activity.solvedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </p>
        </div>

        <span className={`difficulty ${activity.difficulty.toLowerCase()}`}>
          {activity.difficulty}
        </span>

        <span className="activity-score">
          +{activity.score} XP
        </span>
      </div>
    ))
  )}
 
</div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

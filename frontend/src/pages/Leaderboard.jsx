
import { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentUserId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${API_URL}/progress/leaderboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setLeaderboard(response.data.leaderboard);
            } catch (error) {
                console.error("Leaderboard error:", error);
                setError("Unable to load leaderboard.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return <div className="leaderboard-loading">Loading leaderboard...</div>;
    }

    if (error) {
        return <div className="leaderboard-error">{error}</div>;
    }

    const topThree = leaderboard.slice(0, 3);
    const remainingUsers = leaderboard.slice(3);

    const medals = ["🥇", "🥈", "🥉"];

    return (
        <div className="leaderboard-page">

            <div className="leaderboard-header">
                <h1>🏆 Leaderboard</h1>
                <p>Compete with other learners and climb the rankings!</p>
            </div>

            {leaderboard.length === 0 ? (
                <p className="leaderboard-empty">
                    No rankings available yet. Start solving problems!
                </p>
            ) : (
                <>
                    {/* Top 3 Podium */}
                    <div className="leaderboard-podium">
                        {topThree.map((user, index) => (
                            <div
                                className={`podium-card podium-${index + 1}`}
                                key={user.userId}
                            >
                                <div className="podium-medal">
                                    {medals[index]}
                                </div>

                                <div className="podium-avatar">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>

                                <h3>{user.name}</h3>

                                <p className="podium-rank">
                                    Rank #{user.rank}
                                </p>

                                <div className="podium-score">
                                    {user.totalScore} XP
                                </div>

                                <p className="podium-solved">
                                    {user.problemsSolved} Problems Solved
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Remaining Rankings */}
                    <div className="leaderboard-table-container">
                        <h2>All Rankings</h2>

                        <div className="leaderboard-table">
                            <div className="leaderboard-table-header">
                                <span>Rank</span>
                                <span>User</span>
                                <span>Problems</span>
                                <span>Points</span>
                            </div>

                            {leaderboard.map(user => (
                                <div
                                    className={`leaderboard-row ${
                                        user.userId === currentUserId
                                            ? "current-user-row"
                                            : ""
                                    }`}
                                    key={user.userId}
                                >
                                    <span className="rank-cell">
                                        {user.rank <= 3
                                            ? medals[user.rank - 1]
                                            : `#${user.rank}`}
                                    </span>

                                    <span className="user-cell">
                                        {user.name}
                                        {user.userId === currentUserId && (
                                            <small>You</small>
                                        )}
                                    </span>

                                    <span>{user.problemsSolved}</span>

                                    <span className="points-cell">
                                        {user.totalScore} XP
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Leaderboard;

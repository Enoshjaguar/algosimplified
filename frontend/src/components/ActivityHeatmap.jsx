
import { useEffect, useState } from "react";
import axios from "axios";
import "./ActivityHeatmap.css";

const API_URL = import.meta.env.VITE_API_URL;

const ActivityHeatmap = () => {
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${API_URL}/progress/activity-heatmap`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setActivity(response.data.activity);
            } catch (error) {
                console.error("Heatmap API error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, []);

    if (loading) {
        return <p>Loading activity...</p>;
    }

    const today = new Date();

    // Show the current month and previous 11 months
    const startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 11,
        1
    );

    // Align the calendar to Sunday
    const calendarStart = new Date(startDate);
    calendarStart.setDate(
        calendarStart.getDate() - calendarStart.getDay()
    );

    const activityMap = {};

    activity.forEach(item => {
        activityMap[item._id] = item.count;
    });

    const weeks = [];
    const monthLabels = [];
    const currentDate = new Date(calendarStart);

    while (currentDate <= today) {
        const week = [];
        const weekIndex = weeks.length;

        for (let day = 0; day < 7; day++) {
            const date = new Date(currentDate);

            if (date >= startDate && date <= today) {
                const dateKey = [
                    date.getFullYear(),
                    String(date.getMonth() + 1).padStart(2, "0"),
                    String(date.getDate()).padStart(2, "0")
                ].join("-");

                week.push({
                    date: dateKey,
                    count: activityMap[dateKey] || 0
                });
            } else {
                week.push(null);
            }

            // Add a month label when a new month starts
            if (
                date.getDate() === 1 &&
                date >= startDate &&
                date <= today
            ) {
                monthLabels.push({
                    name: date.toLocaleString("en-US", {
                        month: "short"
                    }),
                    weekIndex
                });
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        weeks.push(week);
    }

    // Ensure the first visible month has a label
    if (monthLabels.length === 0 || monthLabels[0].weekIndex !== 0) {
        monthLabels.unshift({
            name: startDate.toLocaleString("en-US", {
                month: "short"
            }),
            weekIndex: 0
        });
    }

    const getLevel = (count) => {
        if (count === 0) return "level-0";
        if (count <= 2) return "level-1";
        if (count <= 4) return "level-2";
        if (count <= 6) return "level-3";
        return "level-4";
    };

    return (
        <div className="activity-heatmap">
            <div className="heatmap-header">
                <h2>DSA Activity</h2>
                <p>Your coding consistency over the last 12 months</p>
            </div>

            <div className="heatmap-scroll">
                <div className="heatmap-calendar">

                  <div className="heatmap-months">
    {monthLabels.map((month, index) => (
        <span
            key={index}
            className="heatmap-month"
            style={{
                "--week-index": month.weekIndex
            }}
        >
            {month.name}
        </span>
    ))}
</div>

                    <div className="heatmap-grid">
                        {weeks.map((week, weekIndex) => (
                            <div className="heatmap-week" key={weekIndex}>
                                {week.map((day, dayIndex) => (
                                    day ? (
                                        <div
                                            key={dayIndex}
                                            className={`heatmap-day ${getLevel(day.count)}`}
                                            title={`${day.count} problems solved on ${day.date}`}
                                        />
                                    ) : (
                                        <div
                                            key={dayIndex}
                                            className="heatmap-day empty"
                                        />
                                    )
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="heatmap-legend">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map(level => (
                    <div
                        key={level}
                        className={`heatmap-day level-${level}`}
                    />
                ))}
                <span>More</span>
            </div>
        </div>
    );
};

export default ActivityHeatmap;

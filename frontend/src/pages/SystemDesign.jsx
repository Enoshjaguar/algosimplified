
import { useEffect, useState } from "react";
import axios from "axios";
import { Network, LoaderCircle } from "lucide-react";
import "./SystemDesign.css";

const API_URL = import.meta.env.VITE_API_URL;

const SystemDesign = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/system-design`
        );

        setTopics(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load System Design topics.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return <div className="system-loading">
      <LoaderCircle className="spin" />
      <p>Loading System Design topics...</p>
    </div>;
  }

  if (error) {
    return <div className="system-error">{error}</div>;
  }

  return (
    <div className="system-design-page">
      <div className="system-design-header">
        <div className="system-design-heading-icon">
          <Network size={30} />
        </div>

        <div>
          <h1>System Design</h1>
          <p>
            Learn how to design scalable and reliable software systems.
          </p>
        </div>
      </div>

      <div className="system-design-count">
        {topics.length} Topics Available
      </div>

      <div className="system-design-grid">
        {topics.map((topic) => (
          <div className="system-topic-card" key={topic._id}>
            <span className="system-topic-category">
              {topic.category}
            </span>

            <h2>{topic.title}</h2>

            <p>{topic.description}</p>

            <span className="system-topic-link">
              Explore Topic →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemDesign;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import "./SystemDesignDetails.css";

const API_URL = import.meta.env.VITE_API_URL;

const SystemDesignDetails = () => {
  const { slug } = useParams();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/system-design/${slug}`
        );

        setTopic(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load topic.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [slug]);

  if (loading) {
    return (
      <div className="system-details-loading">
        <LoaderCircle className="spin" />
        <p>Loading topic...</p>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="system-details-error">
        {error || "Topic not found"}
      </div>
    );
  }

  return (
    <div className="system-details-page">

      <Link to="/system-design" className="system-back-link">
        <ArrowLeft size={18} />
        Back to System Design
      </Link>

      <div className="system-details-header">
        <span className="system-topic-category">
          {topic.category}
        </span>

        <h1>{topic.title}</h1>

        <p>{topic.description}</p>
      </div>

      <div className="system-details-content">
        <h2>Understanding {topic.title}</h2>

        <div className="system-explanation">
          {topic.explanation}
        </div>

        {topic.imageUrl && (
  <div className="system-diagram">
    <h2>Architecture Diagram</h2>

    <img
      src={topic.imageUrl}
      alt={`${topic.title} architecture diagram`}
      onError={(e) => {
        e.target.style.display = "none";
        console.error("Failed to load architecture diagram");
      }}
    />
  </div>
)}
      </div>

    </div>
  );
};

export default SystemDesignDetails;


import { Link } from "react-router-dom";
import {
  Rocket,
  ArrowLeft,
  Sparkles
} from "lucide-react";

import "./ComingSoon.css"

const ComingSoon = ({
  title = "Coming Soon",
  description = "We're working hard to bring you something exciting. Stay tuned!"
}) => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-card">

        <div className="coming-soon-icon">
          <Rocket size={42} />
          <Sparkles className="sparkle-icon" size={20} />
        </div>

        <span className="coming-soon-badge">
          Coming Soon
        </span>

        <h1>{title}</h1>

        <p>{description}</p>

        <div className="coming-soon-progress">
          <div className="coming-soon-progress-bar"></div>
        </div>

        <span className="coming-soon-note">
          Something awesome is on its way!
        </span>

        <Link to="/" className="coming-soon-button">
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

      </div>
    </div>
  );
};

export default ComingSoon;

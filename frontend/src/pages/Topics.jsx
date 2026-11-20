
import { useEffect, useState, useRef } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
console.log("CURRENT API URL:", API_URL);
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import confetti from "canvas-confetti";

const Topics = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [solvedProblems, setSolvedProblems] = useState([]);

  const [expandedTopics, setExpandedTopics] = useState([]);
  const [expandedPatterns, setExpandedPatterns] = useState([]);

  const solveAudioRef = useRef(null);

useEffect(() => {
  solveAudioRef.current = new Audio("/sounds/solve.mp3");
  solveAudioRef.current.volume = 0.35;
}, []);

  
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [problemsResponse, progressResponse] = await Promise.all([
        axios.get(`${API_URL}/problems/getallproblems`),

        axios.get(`${API_URL}/progress`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ]);

      setProblems(problemsResponse.data.problems);

      const solvedIds = progressResponse.data.progress
        .filter((item) => item.isSolved)
        .map((item) => item.problem);

      setSolvedProblems(solvedIds.map((id) => String(id._id || id)));

    } catch (err) {
      setError("Unable to fetch problems or progress. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


const handleSolve = async (problemId) => {
  try {
    const token = localStorage.getItem("token");

    const isCurrentlySolved = solvedProblems.includes(problemId);

    const response = await axios.patch(
      `${API_URL}/progress/${problemId}`,
      {
        isSolved: !isCurrentlySolved
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (isCurrentlySolved) {
      setSolvedProblems((previous) =>
        previous.filter((id) => id !== problemId)
      );
    } else {
  setSolvedProblems((previous) => [...previous, problemId]);

  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: 0.85,
      y: 0.65
    },
    colors: ["#22c55e", "#facc15", "#38bdf8", "#f472b6", "#a78bfa"],
    startVelocity: 35,
    gravity: 0.9,
    scalar: 0.9,
    ticks: 100
  });
  if (solveAudioRef.current) {
  solveAudioRef.current.currentTime = 0;
  solveAudioRef.current.play().catch(console.error);
}
}

    console.log(response.data.message);

  } catch (error) {
    console.error(
      "Error updating problem status:",
      error.response?.data || error.message
    );
  }
};


  // Keep topics in the order we choose
  const topicOrder = [
    "Arrays",
    "Strings",
    "Binary Search",
    "Stack",
    "Linked List",
    "Recursion",
    "Trees",
    "Graphs",
    "Dynamic Programming"
  ];

  const patternOrder = {
    Arrays: [
      "Two Pointers",
      "Sliding Window",
      "Prefix Sum",
      "Kadane's Algorithm"
    ],
    Strings: [
      "Two Pointers",
      "Sliding Window"
    ],
    "Binary Search": [
      "Classic Binary Search",
      "Lower and Upper Bound",
      "Binary Search on Answer"
    ],
    Stack: [
      "Monotonic Stack",
      "Expression Evaluation",
      "Stack Undo",
      "Parentheses",
      "Stack-Based Design",
      "Stack + Greedy"
    ]
  };

  // Group problems by topic and pattern
  const groupedTopics = {};

  problems.forEach((problem) => {
    if (!groupedTopics[problem.topic]) {
      groupedTopics[problem.topic] = {};
    }

    if (!groupedTopics[problem.topic][problem.pattern]) {
      groupedTopics[problem.topic][problem.pattern] = [];
    }

    groupedTopics[problem.topic][problem.pattern].push(problem);
  });

  const topics = Object.keys(groupedTopics).sort((a, b) => {
    const indexA = topicOrder.indexOf(a);
    const indexB = topicOrder.indexOf(b);

    return (indexA === -1 ? 999 : indexA) -
           (indexB === -1 ? 999 : indexB);
  });

  const toggleTopic = (topic) => {
    setExpandedTopics((previous) =>
      previous.includes(topic)
        ? previous.filter((item) => item !== topic)
        : [...previous, topic]
    );
  };

  const togglePattern = (patternKey) => {
    setExpandedPatterns((previous) =>
      previous.includes(patternKey)
        ? previous.filter((item) => item !== patternKey)
        : [...previous, patternKey]
    );
  };

  if (loading) return <h2>Loading problems...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="topics-page">
      <h1>DSA Sheet</h1>
      <p>Explore topics, patterns and practice problems.</p>

      <div className="topic-list">
        {topics.map((topic) => {
          const isTopicExpanded = expandedTopics.includes(topic);

          const patterns = Object.keys(groupedTopics[topic]).sort((a, b) => {
            const order = patternOrder[topic] || [];
            const indexA = order.indexOf(a);
            const indexB = order.indexOf(b);

            return (indexA === -1 ? 999 : indexA) -
                   (indexB === -1 ? 999 : indexB);
          });

          const topicProblemCount = Object.values(
            groupedTopics[topic]
          ).reduce((total, patternProblems) => {
            return total + patternProblems.length;
          }, 0);

          return (
            <div className="topic-item" key={topic}>
              <div
                className="topic-header"
                onClick={() => toggleTopic(topic)}
              >
                {isTopicExpanded ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}

                <h2>{topic}</h2>
                <span>{patterns.length} Patterns</span>
                <span>{topicProblemCount} Problems</span>
              </div>

              {isTopicExpanded && (
                <div className="pattern-list">
                  {patterns.map((pattern) => {
                    const patternKey = `${topic}-${pattern}`;
                    const isPatternExpanded =
                      expandedPatterns.includes(patternKey);

                    const patternProblems =
                      groupedTopics[topic][pattern];

                    return (
                      <div className="pattern-item" key={patternKey}>
                        <div
                          className="pattern-header"
                          onClick={() => togglePattern(patternKey)}
                        >
                          {isPatternExpanded ? (
                            <ChevronDown size={17} />
                          ) : (
                            <ChevronRight size={17} />
                          )}

                          <h3>{pattern}</h3>
                          <span>{patternProblems.length} Problems</span>
                        </div>

                        {isPatternExpanded && (
                          <div className="problem-list">
                            {patternProblems.map((problem) => (
                             
<div className="problem-row" key={problem._id}>
  <a
    href={problem.problemLink}
    target="_blank"
    rel="noopener noreferrer"
    className="problem-title"
  >
   <h3>{problem.title}</h3> 
  </a>

  <div className="problem-details">
    <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
      {problem.difficulty}
    </span>

    <span className="platform">
      {problem.platform}
    </span>

    <span className="problem-score">
      {problem.score} points
    </span>
    
<button
  className={`solve-btn ${
    solvedProblems.includes(problem._id) ? "solved" : ""
  }`}
  onClick={() => handleSolve(problem._id)}
  title={
    solvedProblems.includes(problem._id)
      ? "Mark as unsolved"
      : "Mark as solved"
  }
>
  <Check size={16} />
</button>

  </div>
</div>

      ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;

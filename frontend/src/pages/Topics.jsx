
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronRight, Check } from "lucide-react";

const Topics = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expandedTopics, setExpandedTopics] = useState([]);
  const [expandedPatterns, setExpandedPatterns] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/problems/getallproblems"
        );

        setProblems(response.data.problems);
      } catch (err) {
        setError("Unable to fetch problems. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);
  const handleSolve = async (problemId) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/progress/${problemId}`,
      {
        isSolved: true
      }
    );

    console.log(response.data.message);

  } catch (error) {
    console.error("Error marking problem as solved:", error.response?.data || error.message);
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
    {problem.title}
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
    <button className="solve-btn"
    onClick={()=>handleSolve(problem._id)}
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

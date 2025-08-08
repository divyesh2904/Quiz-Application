import React from "react";
import { Link } from "react-router-dom";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import "./LandingPage.css";

const features = [
  {
    id: 1,
    title: "Interactive History Quizzes",
    description:
      "Engage with fun and challenging quizzes covering various historical periods and events",
    icon: "/images/features/quiz-icon.svg",
    image:
      "https://img.freepik.com/free-vector/online-test-concept-illustration_114360-5486.jpg",
    color: "#4F46E5",
  },
  {
    id: 2,
    title: "Track Your Progress",
    description:
      "Monitor your performance with detailed analytics and see how your knowledge improves over time",
    icon: "/images/features/progress-icon.svg",
    image:
      "https://img.freepik.com/free-vector/data-analysis-illustration-flat-style-design_159144-40.jpg",
    color: "#10B981",
  },
  {
    id: 3,
    title: "Learn from History",
    description:
      "Discover fascinating historical facts and stories through our carefully curated questions",
    icon: "/images/features/learn-icon.svg",
    image:
      "https://img.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg",
    color: "#F59E0B",
  },
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Explore History Through Interactive Quizzes
          </h1>
          <p className="hero-subtitle">
            Challenge yourself with our engaging history quizzes and track your
            progress
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="hero-button secondary">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose Quiztory?</h2>
          <p className="section-subtitle">
            Discover the perfect way to learn and test your history knowledge
          </p>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-image-container">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="feature-image"
                  />
                </div>
                <div className="feature-content">
                  <div
                    className="feature-icon-container"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <svg
                      className="feature-icon"
                      style={{ color: feature.color }}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {feature.id === 1 && (
                        <path
                          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {feature.id === 2 && (
                        <path
                          d="M16 8V16M12 11V16M8 14V16M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {feature.id === 3 && (
                        <path
                          d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </svg>
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

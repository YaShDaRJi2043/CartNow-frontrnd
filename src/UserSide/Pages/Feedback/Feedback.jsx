import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import "./Feedback.css";
import BASE_URL from "../../../services/Helper";

const Feedback = () => {
  const { userToken, user } = useSelector((state) => state.auth);
  const [feedbackData, setFeedbackData] = useState({
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackData.feedback.trim()) {
      toast.error("Please provide your feedback before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await BASE_URL.post(
        "/user/feedback/add",
        {
          email: user.email,
          message: feedbackData.feedback,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Thank you for your feedback!");
        setFeedbackData({ feedback: "" });
      }
    } catch (err) {
      console.error("Feedback submission error:", err);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h1 className="feedback-title">Share Your Feedback</h1>
        <p className="feedback-subtitle">
          We value your opinion and would love to hear about your experience
        </p>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <textarea
            className="feedback-textarea"
            name="feedback"
            placeholder="Tell us what you think..."
            onChange={handleInputChange}
            value={feedbackData.feedback}
            rows="6"
          />

          <button
            type="submit"
            className="feedback-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
            padding: "12px 20px",
          },
        }}
      />
    </div>
  );
};

export default Feedback;

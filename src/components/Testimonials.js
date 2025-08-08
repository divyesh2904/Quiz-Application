import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Yvette Switzer",
    role: "4th Grade Teacher",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    testimonial: (
      <>
        "I use Quizmaster to reinforce and check understanding after we've
        covered a concept pretty thoroughly. I use it in stations. I use it for
        tutoring. I also use it to review and prepare my students for benchmark
        and state tests.{" "}
        <span className="highlight">They love it every time.</span>"
      </>
    ),
    borderColor: "#FF6B6B",
  },
  {
    id: 2,
    name: "James Newman",
    role: "Sr. Manager of Academic Instructional Technology",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    testimonial: (
      <>
        "<span className="highlight">Quizmaster motivates [students]</span>,
        increases confidence, and can help to establish a culture of learning
        and growing from mistakes."
      </>
    ),
    borderColor: "#4ECDC4",
  },
  {
    id: 3,
    name: "Shallamar Goodwin-Richards",
    role: "High School Math Teacher",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    testimonial: (
      <>
        "I have students with IEPs,{" "}
        <span className="highlight">
          I am able to find lessons catering to their abilities and
          accommodation
        </span>{" "}
        while being able to assign the other students with more rigorous
        assessments."
      </>
    ),
    borderColor: "#FFB900",
  },
];

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slider-arrow next" onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 18l6-6-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slider-arrow prev" onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const Testimonials = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-slide">
              <div
                className="testimonial-card"
                style={{ borderColor: testimonial.borderColor }}
              >
                <div className="testimonial-header">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-image"
                  />
                  <div className="testimonial-info">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
                <div className="testimonial-text">
                  {testimonial.testimonial}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;

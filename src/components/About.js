import React from "react";
import {
  MapPin,
  Users,
  Code,
  Heart,
  GraduationCap,
  Building,
} from "lucide-react";
import "./About.css";

const About = () => {
  const teamMembers = [
    {
      name: "Hackanauts Team",
      role: "Development Team",
      description:
        "Passionate developers dedicated to creating innovative healthcare solutions",
      icon: <Users className="team-icon" />,
    },
  ];

  const features = [
    {
      icon: <Heart className="feature-icon" />,
      title: "Healthcare Focus",
      description:
        "Dedicated to improving healthcare accessibility through technology",
    },
    {
      icon: <Code className="feature-icon" />,
      title: "Innovation",
      description: "Cutting-edge solutions for modern healthcare challenges",
    },
    {
      icon: <GraduationCap className="feature-icon" />,
      title: "24/7 AI Assistance",
      description: "Dedicated to improving healthcare accessibility through technology",
    },
  ];

  return (
    <section className="about">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h1 className="about-title">About Niramaya</h1>
          <p className="about-subtitle">
            Empowering healthcare through innovative technology and
            compassionate care
          </p>
        </div>

        {/* Website Description */}
        <div className="about-section">
          <div className="section-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-description">
              Niramaya is a comprehensive healthcare platform designed to make
              medical assistance more accessible and user-friendly. We combine
              the power of artificial intelligence with practical healthcare
              solutions to provide users with reliable symptom checking,
              self-care guidance, and health management tools.
            </p>
            <p className="section-description">
              Our platform is built with the vision of democratizing healthcare,
              making it easier for everyone to take control of their health and
              well-being through technology-driven solutions.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-section">
          <h2 className="section-title">What We Offer</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-container">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="section-title">Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-icon-container">{member.icon}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="location-section">
          <div className="location-content">
            <div className="location-icon-container">
              <MapPin className="location-icon" />
            </div>
            <div className="location-info">
              <h2 className="location-title">Located at</h2>
              <div className="location-details">
                <div className="location-item">
                  <Building className="location-item-icon" />
                  <span>Amity University</span>
                </div>
                <div className="location-item">
                  <MapPin className="location-item-icon" />
                  <span>Lucknow Campus</span>
                </div>
              </div>
              <p className="location-description">
                Our development hub is based at Amity University Lucknow Campus,
                where innovation meets education to create solutions that make a
                real difference in people's lives.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="about-footer">
          <div className="footer-message">
            <Heart className="footer-icon" />
            <p className="footer-text">
              Building the future of healthcare, one innovation at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

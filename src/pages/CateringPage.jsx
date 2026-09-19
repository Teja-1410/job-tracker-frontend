import { Link } from "react-router-dom";
import staffingImg from "../assets/catering-staffing.png";
import fullMenuImg from "../assets/catering-full-menu.png";
import liveCounterImg from "../assets/catering-live-counter.png";
import { useNavigate } from "react-router-dom";

function CateringPage() {
    const navigate = useNavigate();

function handleBookClick() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first to book a service.");
    navigate("/#app");
  } else {
    alert("Booking coming soon!");
  }
}
  const subServices = [
    {
      name: "Event Staffing",
      image: staffingImg,
      desc: "Trained catering staff for events of any size, handling service and coordination on the day.",
      price: "₹2,999"
    },
    {
      name: "Full Menu Catering",
      image: fullMenuImg,
      desc: "Complete meal planning and preparation for your event, from starters to dessert.",
      price: "₹4,999"
    },
    {
      name: "Live Counter Setup",
      image: liveCounterImg,
      desc: "Interactive live food counters — chaat, grill, or dessert stations set up at your venue.",
      price: "₹3,499"
    }
  ];

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-logo">⚡ Job Tracker</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
        </div>
      </nav>

      <section className="service-detail-hero">
        <h1>Catering</h1>
        <p>
          Reliable catering support for events — staffing, full menu service, and
          live food counters coordinated and tracked from booking to completion.
        </p>
      </section>

      <section className="subservice-section">
        <div className="subservice-grid">
          {subServices.map((sub) => (
            <div className="subservice-card" key={sub.name}>
              <img src={sub.image} alt={sub.name} className="subservice-image" />
              <h3>{sub.name}</h3>
              <p>{sub.desc}</p>
              <div className="subservice-price">{sub.price}</div>
              <button className="book-btn" onClick={handleBookClick}>
  Book
</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CateringPage;
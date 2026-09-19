import { Link } from "react-router-dom";
import installationImg from "../assets/ac-installation.png";
import servicingImg from "../assets/ac-servicing.png";
import gasFillingImg from "../assets/ac-gas-filling.png";
import { useNavigate } from "react-router-dom";

function ACRepairPage() {
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
      name: "Installation",
      image: installationImg,
      desc: "New AC unit installation, including mounting, wiring checks, and initial setup for cooling performance.",
      price: "₹1,499"
    },
    {
      name: "Servicing",
      image: servicingImg,
      desc: "Routine cleaning and performance check to keep your AC running efficiently and prevent future breakdowns.",
      price: "₹499"
    },
    {
      name: "Gas Filling",
      image: gasFillingImg,
      desc: "Refrigerant gas top-up for units with reduced cooling, including a leak check before refilling.",
      price: "₹899"
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
        <h1>AC Repair</h1>
        <p>
          Professional AC installation, servicing, and gas refill — handled by
          verified technicians and tracked from booking to completion.
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
              <button className="book-btn" onClick={handleBookClick}>Book</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}



export default ACRepairPage;
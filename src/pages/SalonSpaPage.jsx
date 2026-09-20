import { Link } from "react-router-dom";
import haircutImg from "../assets/salon-haircut.png";
import facialImg from "../assets/salon-facial.png";
import massageImg from "../assets/salon-massage.png";
import { useNavigate } from "react-router-dom";

function SalonSpaPage() {
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
      name: "Haircut & Styling",
      image: haircutImg,
      desc: "Professional haircut and styling at home, tailored to your preferred look.",
      price: "₹399"
    },
    {
      name: "Facial & Cleanup",
      image: facialImg,
      desc: "Skin-friendly facial and cleanup treatment using quality products for a fresh glow.",
      price: "₹699"
    },
    {
      name: "Spa Massage",
      image: massageImg,
      desc: "Relaxing full-body spa massage performed by trained therapists in the comfort of your home.",
      price: "₹999"
    }
  ];

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-logo">⚡ Job Tracker</Link>
        <div className="detail-nav-links">
          <Link to="/">Home</Link>
        </div>
      </nav>

      <section className="service-detail-hero">
        <h1>Salon & Spa</h1>
        <p>
          Professional salon and spa services at home — haircuts, facials, and
          massages handled by verified stylists and therapists.
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

export default SalonSpaPage;
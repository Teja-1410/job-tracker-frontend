import { Link } from "react-router-dom";
import deepCleaningImg from "../assets/cleaning-deep.png";
import kitchenImg from "../assets/cleaning-kitchen.png";
import bathroomImg from "../assets/cleaning-bathroom.png";
import { useNavigate } from "react-router-dom";

function CleaningPage() {

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
      name: "Home Deep Cleaning",
      image: deepCleaningImg,
      desc: "Thorough deep cleaning covering every room, including hard-to-reach corners and surfaces.",
      price: "₹1,299"
    },
    {
      name: "Kitchen Cleaning",
      image: kitchenImg,
      desc: "Detailed kitchen cleaning including countertops, cabinets, and stove degreasing.",
      price: "₹799"
    },
    {
      name: "Bathroom Cleaning",
      image: bathroomImg,
      desc: "Deep sanitization and descaling for tiles, fittings, and fixtures.",
      price: "₹599"
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
        <h1>Cleaning</h1>
        <p>
          Professional home cleaning services — deep cleaning, kitchen, and
          bathroom care handled by trained staff and tracked from start to finish.
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

export default CleaningPage;
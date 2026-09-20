import { Link } from "react-router-dom";
import wiringImg from "../assets/electrician-wiring.png";
import switchboardImg from "../assets/electrician-switchboard.png";
import applianceImg from "../assets/electrician-appliance.png";
import { useNavigate } from "react-router-dom";

function ElectricianPage() {
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
      name: "Wiring Repair",
      image: wiringImg,
      desc: "Safe diagnosis and repair of faulty or damaged household wiring.",
      price: "₹499"
    },
    {
      name: "Switchboard Installation",
      image: switchboardImg,
      desc: "New switchboard setup or replacement, done with proper safety checks.",
      price: "₹699"
    },
    {
      name: "Appliance Repair",
      image: applianceImg,
      desc: "Troubleshooting and repair for common household electrical appliances.",
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
        <h1>Electrician</h1>
        <p>
          Reliable electrical services — wiring repair, switchboard installation,
          and appliance repair handled by verified electricians.
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

export default ElectricianPage;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import acRepairImg from "./assets/ac-repair.png";
import salonImg from "./assets/salon-spa.png";
import cateringImg from "./assets/catering.png";
import cleaningImg from "./assets/cleaning.png";
import electricianImg from "./assets/electrician.png";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [assignSelections, setAssignSelections] = useState({});
  const [isSignup, setIsSignup] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupRole, setSignupRole] = useState("customer");
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUserId = localStorage.getItem("userId");
    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole);
      setUserId(savedUserId);
    }
  }, []);

  useEffect(() => {
    if (token && (role === "manager" || role === "owner")) {
      fetch("http://localhost:3000/users/staff", {
        headers: { Authorization: "Bearer " + token }
      })
        .then((res) => res.json())
        .then((data) => setStaffList(data));
    }
  }, [token, role]);

  function handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setRole(data.role);
          setUserId(data.userId);
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("userId", data.userId);
          alert("Logged in successfully!");
        } else {
          alert(data.message);
        }
      });
  }

  function handleSignup(e) {
    e.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: signupName, email, password, role: signupRole })
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setIsSignup(false);
        setSignupName("");
        setEmail("");
        setPassword("");
      });
  }

  function handleLogout() {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  }

  function handleCreateJob(e) {
  e.preventDefault();
  fetch("http://localhost:3000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ title: newJobTitle })
  })
    .then((res) => res.json())
    .then((newJob) => {
      if (newJob.message) {
        alert(newJob.message);
      } else {
        setJobs([...jobs, newJob]);
        setNewJobTitle("");
      }
    })
    .catch(() => {
      alert("Something went wrong creating the job. Please try again.");
    });
}

  function handleClaimJob(jobId) {
    fetch("http://localhost:3000/jobs/" + jobId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ status: "claimed" })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          setJobs(jobs.map((job) => (job._id === data._id ? data : job)));
        }
      });
  }

  function handleUpdateStatus(jobId, newStatus) {
    fetch("http://localhost:3000/jobs/" + jobId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          setJobs(jobs.map((job) => (job._id === data._id ? data : job)));
        }
      });
  }

  function handleAssignJob(jobId) {
  const selectedStaffId = assignSelections[jobId];
  const selectedStaff = staffList.find((s) => s._id === selectedStaffId);

  if (!selectedStaff) {
    alert("Please select a staff member first.");
    return;
  }

  fetch("http://localhost:3000/jobs/" + jobId + "/assign", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      staffId: selectedStaff._id,
      staffName: selectedStaff.name
    })
  })
    .then((res) => res.json())
    .then((updatedJob) => {
      if (updatedJob.message) {
        alert(updatedJob.message);
      } else {
        setJobs(
          jobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
        );
        setAssignSelections({ ...assignSelections, [jobId]: "" });
      }
    })
    .catch(() => {
      alert("Something went wrong assigning the job. Please try again.");
    });
}

  const stats = {
    pending: jobs.filter((j) => j.status === "pending").length,
    claimed: jobs.filter((j) => j.status === "claimed").length,
    inProgress: jobs.filter((j) => j.status === "in-progress").length,
    done: jobs.filter((j) => j.status === "done").length
  };

  const services = [
    { image: acRepairImg, name: "AC Repair", desc: "Installation, servicing, and gas refill jobs coordinated in real time.", link: "/services/ac-repair" },
    { image: salonImg, name: "Salon & Spa", desc: "Home visits and in-store appointments tracked from booking to finish.", link: "/services/salon-spa" },
    { image: cateringImg, name: "Catering", desc: "Event staffing and delivery jobs assigned fairly across your team.", link: "/services/catering" },
    { image: cleaningImg, name: "Cleaning", desc: "Recurring and one-time cleaning jobs, claimed and tracked live.", link: "/services/cleaning" },
    { image: electricianImg, name: "Electrician", desc: "Urgent and scheduled electrical work dispatched to available staff.", link: "/services/electrician" }
  ];

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo">⚡ Job Tracker</div>

        <button
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <div className={"nav-links" + (mobileMenuOpen ? " nav-links-open" : "")}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#app" onClick={closeMenu}>Login/Sign Up</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <h1>⚡ Job Tracker</h1>
        <p className="tagline">Live job dispatch for local service teams</p>
        <a href="#app" className="hero-btn">Login/Sign Up</a>
      </section>

      <section id="services" className="services-section">
        <h2>Services We Coordinate</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.name}>
              <img src={service.image} alt={service.name} className="service-image" />
              <h3>{service.name}</h3>
              <p>{service.desc}</p>
              <Link to={service.link} className="explore-btn">Explore now</Link>
            </div>
          ))}

          {/* Remove this placeholder card once a 6th real service is added */}
          <div className="service-card service-card-muted">
            <div className="coming-soon-icon">✨</div>
            <h3>New Services Launching Soon</h3>
            <p>We're expanding our service categories. Check back soon for more ways we can help.</p>
          </div>
        </div>
      </section>

      <section id="app" className="app-section">
        <div className="app-body">
          {!token && (
            <div className="panel">
              {isSignup ? (
                <form onSubmit={handleSignup}>
                  <h2>Sign up</h2>
                  <input
                    type="text"
                    placeholder="Name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                  <select value={signupRole} onChange={(e) => setSignupRole(e.target.value)}>
                    <option value="customer">I'm a Customer</option>
                    <option value="staff">I'm Staff</option>
                  </select>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">Create account</button>
                </form>
              ) : (
                <form onSubmit={handleLogin}>
                  <h2>Log in</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">Log in</button>
                </form>
              )}
              <button className="toggle-btn" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Already have an account? Log in" : "New here? Create an account"}
              </button>
            </div>
          )}

          {token && (role === "staff" || role === "manager" || role === "owner") && (
            <div>
              {(role === "manager" || role === "owner") && (
                <div className="panel">
                  <div className="session-row">
                    <p>Signed in as {role}</p>
                    <button className="logout-btn" onClick={handleLogout}>Log out</button>
                  </div>

                  <form onSubmit={handleCreateJob}>
                    <h2>Create a job</h2>
                    <select
                      value={newJobTitle}
                      onChange={(e) => setNewJobTitle(e.target.value)}
                      required
                    >
                      <option value="">Select a service</option>
                      <optgroup label="AC Repair">
                        <option value="AC Repair - Installation">Installation</option>
                        <option value="AC Repair - Servicing">Servicing</option>
                        <option value="AC Repair - Gas Filling">Gas Filling</option>
                      </optgroup>
                      <optgroup label="Salon & Spa">
                        <option value="Salon - Haircut & Styling">Haircut & Styling</option>
                        <option value="Salon - Facial & Cleanup">Facial & Cleanup</option>
                        <option value="Salon - Spa Massage">Spa Massage</option>
                      </optgroup>
                      <optgroup label="Catering">
                        <option value="Catering - Event Staffing">Event Staffing</option>
                        <option value="Catering - Full Menu Catering">Full Menu Catering</option>
                        <option value="Catering - Live Counter Setup">Live Counter Setup</option>
                      </optgroup>
                      <optgroup label="Cleaning">
                        <option value="Cleaning - Home Deep Cleaning">Home Deep Cleaning</option>
                        <option value="Cleaning - Kitchen Cleaning">Kitchen Cleaning</option>
                        <option value="Cleaning - Bathroom Cleaning">Bathroom Cleaning</option>
                      </optgroup>
                      <optgroup label="Electrician">
                        <option value="Electrician - Wiring Repair">Wiring Repair</option>
                        <option value="Electrician - Switchboard Installation">Switchboard Installation</option>
                        <option value="Electrician - Appliance Repair">Appliance Repair</option>
                      </optgroup>
                    </select>
                    <button type="submit">Create job</button>
                  </form>
                </div>
              )}

              {role === "staff" && (
                <div className="panel">
                  <div className="session-row">
                    <p>Signed in as {role}</p>
                    <button className="logout-btn" onClick={handleLogout}>Log out</button>
                  </div>
                </div>
              )}

              <div className="stats-row">
                <div className="stat-pill stat-pending">{stats.pending} Pending</div>
                <div className="stat-pill stat-claimed">{stats.claimed} Claimed</div>
                <div className="stat-pill stat-progress">{stats.inProgress} In progress</div>
                <div className="stat-pill stat-done">{stats.done} Done</div>
              </div>

              <p className="jobs-heading">Jobs</p>

              {loading && <p className="empty-state">Loading jobs...</p>}
              {!loading && jobs.length === 0 && (
                <p className="empty-state">No jobs yet.</p>
              )}

              {jobs.map((job) => {
                const isMyJob = job.claimedBy === userId;

                return (
                  <div className={"job-row status-" + job.status} key={job._id}>
                    <div className="job-title-line">
                      <strong>{job.title}</strong>
                      <span className={"job-status-tag status-" + job.status}>
                        {job.status}
                      </span>
                    </div>

                    {job.assignedTo && (
                      <p className="job-meta">Assigned to {job.assignedTo}</p>
                    )}

                    {job.status === "pending" && role === "staff" && (
                      <button onClick={() => handleClaimJob(job._id)}>Claim job</button>
                    )}

                    {job.status === "claimed" && isMyJob && (
                      <button onClick={() => handleUpdateStatus(job._id, "in-progress")}>
                        Start job
                      </button>
                    )}

                    {job.status === "in-progress" && isMyJob && (
                      <button onClick={() => handleUpdateStatus(job._id, "done")}>
                        Mark done
                      </button>
                    )}

                    {job.status !== "pending" && !isMyJob && role === "staff" && (
                      <p className="job-meta">
                        {job.assignedTo ? "Assigned to another team member" : "Claimed by another team member"}
                      </p>
                    )}

                    {(role === "manager" || role === "owner") && (
                      <div className="assign-row">
                        <select
                          value={assignSelections[job._id] || ""}
                          onChange={(e) =>
                            setAssignSelections({ ...assignSelections, [job._id]: e.target.value })
                          }
                        >
                          <option value="">Select staff</option>
                          {staffList.map((staff) => (
                            <option key={staff._id} value={staff._id}>
                              {staff.name} ({staff.email})
                            </option>
                          ))}
                        </select>
                        <button onClick={() => handleAssignJob(job._id)}>Assign</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {token && role === "customer" && (
            <div className="panel">
              <div className="session-row">
                <p>Signed in as {role}</p>
                <button className="logout-btn" onClick={handleLogout}>Log out</button>
              </div>
              <p className="empty-state">
                Browse our services above and click "Book" to request one.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About Job Tracker</h2>
        <p>
          Job Tracker helps local service businesses — AC repair shops, salons,
          catering teams and more — coordinate work in real time instead of
          relying on chaotic WhatsApp groups. Staff claim jobs fairly, managers
          track everything live, and no one gets overloaded.
        </p>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Job Tracker</h3>
            <p>Live job dispatch for local service teams.</p>
          </div>
          <div className="footer-col">
            <h3>Contact</h3>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@jobtracker.app</p>
          </div>
          <div className="footer-col">
            <h3>Follow us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 011.77 1.15 4.9 4.9 0 011.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 011.15-1.77A4.9 4.9 0 015.59 1.8c.46-.16 1.26-.35 2.43-.4C9.29 1.34 9.67 1.33 12 1.33zm0 1.8c-3.15 0-3.5.01-4.74.07-.96.04-1.48.2-1.83.34-.46.18-.79.4-1.13.74-.34.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.83.18.46.4.79.74 1.13.34.34.67.56 1.13.74.35.14.87.3 1.83.34 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.4 1.13-.74.34-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.83a3.1 3.1 0 00-.74-1.13 3.1 3.1 0 00-1.13-.74c-.35-.14-.87-.3-1.83-.34-1.24-.06-1.59-.07-4.74-.07zm0 3.87a4.13 4.13 0 110 8.26 4.13 4.13 0 010-8.26zm0 1.8a2.33 2.33 0 100 4.66 2.33 2.33 0 000-4.66zm5.26-2a.97.97 0 11-1.94 0 .97.97 0 011.94 0z"/>
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.9L4.4 22H1.3l8.1-9.3L1 2h7l4.9 6.3L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <p className="footer-bottom">© 2026 Job Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
const departments = [
  { id: "cardiology", name: "Cardiology", icon: "♡", desc: "Heart health, diagnosis and specialist cardiac care." },
  { id: "neurology", name: "Neurology", icon: "◉", desc: "Specialist care for brain, nerve and neurological conditions." },
  { id: "orthopedics", name: "Orthopedics", icon: "⌁", desc: "Bone, joint and mobility care from experienced specialists." },
  { id: "pediatrics", name: "Pediatrics", icon: "✦", desc: "Gentle, family-focused medical care for children." },
  { id: "gynecology", name: "Gynecology", icon: "✿", desc: "Comprehensive women’s health and wellness services." },
  { id: "general", name: "General Medicine", icon: "✚", desc: "Everyday health concerns, diagnosis and ongoing care." },
  { id: "dermatology", name: "Dermatology", icon: "✧", desc: "Care for skin, hair and common dermatological conditions." },
  { id: "ophthalmology", name: "Ophthalmology", icon: "◌", desc: "Eye examinations and specialist vision care." },
  { id: "ent", name: "ENT", icon: "◍", desc: "Ear, nose and throat assessment and treatment." }
];

const doctors = [
  {
    name: "Dr. Sayedul Islam",
    dept: "Cardiology",
    role: "Senior Consultant",
    image: "doctor1.png"
  },

  {
    name: "Dr. Nusrat Jahan",
    dept: "Pediatrics",
    role: "Consultant Pediatrician",
    image: "doctor2.png"
  },

  {
    name: "Dr. Tanvir Ahmed",
    dept: "Orthopedics",
    role: "Orthopedic Specialist",
    image: "doctor3.png"
  },

  {
    name: "Dr. Farhana Karim",
    dept: "Gynecology",
    role: "Women’s Health Specialist",
    image: "doctor4.png"
  },

  {
    name: "Dr. Mahmud Hasan",
    dept: "Neurology",
    role: "Neurology Consultant",
    image: "doctor5.png"
  },

  {
    name: "Dr. Sadia Chowdhury",
    dept: "Dermatology",
    role: "Dermatology Consultant",
    image: "doctor6.png"
  },

  {
    name: "Dr. Rafiq Islam",
    dept: "General Medicine",
    role: "Senior Physician",
    image: "doctor7.png"
  },

  {
    name: "Dr. Mahi Rahman",
    dept: "Ophthalmology",
    role: "Eye Specialist",
    image: "doctor8"
  }
];

const navItems = [
  ["index.html", "Home"], ["about.html", "About"], ["departments.html", "Departments"],
  ["doctors.html", "Doctors"], ["contact.html", "Contact"]
];

function injectLayout() {
  const nav = document.getElementById("nav");
  const footer = document.getElementById("footer");
  const current = location.pathname.split("/").pop() || "index.html";
  if (nav) {
    nav.innerHTML = `<header class="navbar">
      <a class="logo" href="index.html" aria-label="Arogya Care Hospital home">
    <img 
        class="logo-image"
        src="logo.png"
        alt="Arogya Care Hospital logo"
    >
    <span>
        Arogya Care
        <small>HOSPITAL</small>
    </span>
</a>
      <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button>
      <nav class="nav-links" aria-label="Primary navigation">
        ${navItems.map(([href, label]) => `<a href="${href}" class="${current === href ? 'active' : ''}">${label}</a>`).join("")}
        <a href="appointment.html" class="nav-cta">Book Appointment</a>
      </nav>
    </header>`;
    const toggle = nav.querySelector(".menu-toggle"), links = nav.querySelector(".nav-links");
    toggle?.addEventListener("click", () => { const open = links.classList.toggle("open"); toggle.setAttribute("aria-expanded", open); document.body.classList.toggle("menu-open", open) });
    links?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { links.classList.remove("open"); document.body.classList.remove("menu-open"); toggle.setAttribute("aria-expanded", "false") }));
  }
  if (footer) {
    footer.innerHTML = `<footer><div class="container"><div class="footer-grid">
      <div class="footer-brand"><a class="logo" href="index.html"><span class="logo-mark">✚</span><span>Arogya Care<small>HOSPITAL</small></span></a><p>Trusted healthcare built around expert medicine, modern technology and compassionate care.</p></div>
      <div class="footer-col"><h4>Explore</h4><a href="about.html">About us</a><a href="departments.html">Departments</a><a href="doctors.html">Doctors</a></div>
      <div class="footer-col"><h4>Patient care</h4><a href="appointment.html">Appointments</a><a href="contact.html">Contact us</a></div>
      <div class="footer-col"><h4>Support</h4><a href="contact.html">Emergency: +880 1234-567890</a><a href="contact.html">12 Hospital Road</a></div>
    </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Arogya Care Hospital. Practice project.</span><span>Designed for clarity, trust & accessibility.</span></div></div></footer>`;
  }
}

function renderDepartments() {
  document.querySelectorAll("#dept-grid").forEach(grid => {
    const limit = Number(grid.dataset.limit) || departments.length;
    grid.innerHTML = departments.slice(0, limit).map(d => `<article class="card">
      <div class="dept-icon">${d.icon}</div><h3>${d.name}</h3><p>${d.desc}</p>
      <a class="card-link" href="doctors.html?dept=${encodeURIComponent(d.name)}">Find doctors →</a>
    </article>`).join("");
  });
}

function doctorMarkup(d){
  return `
    <article class="card doctor-card-item">

      <div class="doctor-photo">
        <img 
          src="${d.image}" 
          alt="${d.name}"
          loading="lazy"
        >
      </div>

      <div class="doctor-info">
        <small>${d.dept}</small>
        <h3>${d.name}</h3>
        <p>${d.role}</p>
      </div>

    </article>
  `;
}
function renderDoctors() {
  const grid = document.getElementById("doctor-grid"); if (!grid) return;
  const search = (document.getElementById("search")?.value || "").trim().toLowerCase();
  const filter = document.getElementById("filter")?.value || "";
  const limit = Number(grid.dataset.limit) || doctors.length;
  const filtered = doctors.filter(d => (!search || d.name.toLowerCase().includes(search) || d.dept.toLowerCase().includes(search)) && (!filter || d.dept === filter)).slice(0, limit);
  grid.innerHTML = filtered.map(doctorMarkup).join("");
  const empty = document.getElementById("empty"); if (empty) empty.hidden = filtered.length > 0;
}
function initDoctorFilters() {
  const filter = document.getElementById("filter"); if (!filter) return;
  [...new Set(doctors.map(d => d.dept))].sort().forEach(d => filter.insertAdjacentHTML("beforeend", `<option value="${d}">${d}</option>`));
  const params = new URLSearchParams(location.search), dept = params.get("dept");
  if (dept && [...filter.options].some(o => o.value === dept)) filter.value = dept;
  document.getElementById("search")?.addEventListener("input", renderDoctors);
  filter.addEventListener("change", renderDoctors); renderDoctors();
}

function initAppointment() {
  const form = document.getElementById("appt-form"); if (!form) return;
  const dept = document.getElementById("dept"), doctor = document.getElementById("doctor"), date = document.getElementById("date");
  departments.forEach(d => dept.insertAdjacentHTML("beforeend", `<option value="${d.name}">${d.name}</option>`));
  function syncDoctors() {
    const selected = dept.value;
    doctor.innerHTML = '<option value="">Select doctor</option>' + doctors.filter(d => !selected || d.dept === selected).map(d => `<option value="${d.name}">${d.name} — ${d.role}</option>`).join("");
  }
  dept.addEventListener("change", syncDoctors); syncDoctors();
  date.min = new Date().toISOString().split("T")[0];
  const key = "arogyaAppointments";
  function get() { try { return JSON.parse(localStorage.getItem(key) || "[]") } catch { return [] } }
  function show() {
    const list = document.getElementById("appt-list"), empty = document.getElementById("no-appt"), data = get();
    list.innerHTML = data.length ? data.map((a, i) => `<div class="appt-item"><strong>${escapeHTML(a.patient)}</strong><span>${escapeHTML(a.doctor)} · ${escapeHTML(a.date)}</span></div>`).join("") : "";
    if (empty) empty.style.display = data.length ? "none" : "block";
  }
  form.addEventListener("submit", e => {
    e.preventDefault(); const msg = document.getElementById("msg");
    const patient = document.getElementById("name").value.trim(), phone = document.getElementById("phone").value.trim();
    if (!patient || !phone || !dept.value || !doctor.value || !date.value) { setMsg(msg, "Please complete all required fields.", "error"); return }
    const data = get(); data.unshift({ patient, phone, dept: dept.value, doctor: doctor.value, date: date.value, note: document.getElementById("note").value.trim() });
    localStorage.setItem(key, JSON.stringify(data)); form.reset(); syncDoctors(); setMsg(msg, "Appointment saved successfully for this practice project.", "success"); show();
  });
  document.getElementById("clear-appts")?.addEventListener("click", () => { localStorage.removeItem(key); show() }); show();
}

function initContact() {
  const form = document.getElementById("contact-form"); if (!form) return;
  form.addEventListener("submit", e => { e.preventDefault(); const msg = document.getElementById("cmsg"); if (!form.checkValidity()) { setMsg(msg, "Please complete the required fields.", "error"); form.reportValidity(); return } setMsg(msg, "Message received. In a real deployment, connect this form to your email/API.", "success"); form.reset() });
}
function setMsg(el, text, type) { if (!el) return; el.textContent = text; el.className = `msg ${type}` }
function escapeHTML(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c])) }
function initReveal() { const els = document.querySelectorAll(".card,.section-heading,.form-card,.side-card,.about-layout,.contact-layout"); const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("reveal"); obs.unobserve(e.target) } }), { threshold: .08 }); els.forEach(e => obs.observe(e)) }
injectLayout(); renderDepartments(); initDoctorFilters(); initAppointment(); initContact(); initReveal();

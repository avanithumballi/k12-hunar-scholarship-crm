import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Award,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  Edit3,
  ExternalLink,
  FileText,
  GraduationCap,
  Landmark,
  Plus,
  Save,
  X,
} from "lucide-react";
import "./styles.css";

const STORAGE_KEY = "k12-hunar-scholarship-crm-amazing-v1";
const STATES = ["Bihar", "Haryana", "Jharkhand"];
const STATUSES = ["Published", "Draft", "Expired"];

const seed = [
  {
    id: 1,
    state: "Bihar",
    name: "Post-Matric Scholarship BC EBC",
    classLevel: "Class 11-12",
    deadline: "2026-09-30",
    status: "Published",
    provider: "Government of Bihar",
    eligibility: "Students belonging to BC/EBC categories studying in Classes 11–12 and meeting the applicable state criteria.",
    benefit: "Financial support towards education expenses.",
    link: "https://www.pmsonline.bihar.gov.in/"
  },
  {
    id: 2,
    state: "Bihar",
    name: "Post-Matric Scholarship SC ST",
    classLevel: "Class 11-12",
    deadline: "2026-09-30",
    status: "Draft",
    provider: "Government of Bihar",
    eligibility: "Students belonging to SC/ST categories studying in Classes 11–12 and meeting the applicable state criteria.",
    benefit: "Financial support towards education expenses.",
    link: "https://www.pmsonline.bihar.gov.in/"
  },
  {
    id: 3,
    state: "Bihar",
    name: "Mukhyamantri Balak Balika Protsahan Yojana",
    classLevel: "Class 9-10",
    deadline: "",
    status: "Expired",
    provider: "Government of Bihar",
    eligibility: "Eligible school students under the applicable state scholarship guidelines.",
    benefit: "Educational incentive benefit.",
    link: "https://medhasoft.bihar.gov.in/"
  },
  {
    id: 4,
    state: "Haryana",
    name: "Pre-Matric Scholarship for SC Students",
    classLevel: "Class 9-10",
    deadline: "2026-12-31",
    status: "Published",
    provider: "Government of Haryana",
    eligibility: "SC students studying in eligible schools and satisfying the scheme criteria.",
    benefit: "Scholarship assistance for eligible students.",
    link: "https://haryanascbc.gov.in/"
  },
  {
    id: 5,
    state: "Haryana",
    name: "Pre-Matric Scholarship for BC Students",
    classLevel: "Class 9-10",
    deadline: "2026-12-31",
    status: "Draft",
    provider: "Government of Haryana",
    eligibility: "BC students studying in eligible schools and satisfying the scheme criteria.",
    benefit: "Scholarship assistance for eligible students.",
    link: "https://haryanascbc.gov.in/"
  },
  {
    id: 6,
    state: "Haryana",
    name: "Post-Matric Scholarship for SC Students",
    classLevel: "Class 11-12",
    deadline: "2026-12-31",
    status: "Expired",
    provider: "Government of Haryana",
    eligibility: "SC students pursuing post-matric education and meeting applicable requirements.",
    benefit: "Scholarship assistance for post-matric studies.",
    link: "https://haryanascbc.gov.in/"
  },
  {
    id: 7,
    state: "Jharkhand",
    name: "Pre-Matric Scholarship for SC Students",
    classLevel: "Class 1-10",
    deadline: "2026-11-20",
    status: "Published",
    provider: "Government of Jharkhand",
    eligibility: "SC students studying in Classes 1–10 who meet the applicable scheme criteria.",
    benefit: "Educational scholarship support.",
    link: "https://ekalyan.cgg.gov.in/"
  },
  {
    id: 8,
    state: "Jharkhand",
    name: "Pre-Matric Scholarship for ST Students",
    classLevel: "Class 1-10",
    deadline: "2026-11-20",
    status: "Draft",
    provider: "Government of Jharkhand",
    eligibility: "ST students studying in Classes 1–10 who meet the applicable scheme criteria.",
    benefit: "Educational scholarship support.",
    link: "https://ekalyan.cgg.gov.in/"
  },
  {
    id: 9,
    state: "Jharkhand",
    name: "Pre-Matric Scholarship for BC OBC Students",
    classLevel: "Class 1-10",
    deadline: "2026-11-20",
    status: "Expired",
    provider: "Government of Jharkhand",
    eligibility: "BC/OBC students studying in Classes 1–10 who meet the applicable scheme criteria.",
    benefit: "Educational scholarship support.",
    link: "https://ekalyan.cgg.gov.in/"
  }
];

const emptyForm = {
  name: "",
  state: "Bihar",
  provider: "",
  classLevel: "",
  eligibility: "",
  benefit: "",
  deadline: "",
  link: "",
  status: "Draft"
};

function formatDate(value) {
  if (!value) return "Not stated";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function loadItems() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) && stored.length ? stored : seed;
  } catch {
    return seed;
  }
}

function App() {
  const [items, setItems] = useState(loadItems);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const recordsRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2300);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const counts = useMemo(() => ({
    total: items.length,
    Published: items.filter((x) => x.status === "Published").length,
    Draft: items.filter((x) => x.status === "Draft").length,
    Expired: items.filter((x) => x.status === "Expired").length
  }), [items]);

  const visibleItems = useMemo(() => {
    return items.filter((item) => {
      const stateMatch = selectedState === "All" || item.state === selectedState;
      const statusMatch = selectedStatus === "All" || item.status === selectedStatus;
      return stateMatch && statusMatch;
    });
  }, [items, selectedState, selectedStatus]);

  function scrollToRecords() {
    recordsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectState(value) {
    setSelectedState(value);
    scrollToRecords();
  }

  function selectStatus(value) {
    setSelectedStatus(value);
    scrollToRecords();
  }

  function clearFilters() {
    setSelectedState("All");
    setSelectedStatus("All");
  }

  function updateStatus(id, status) {
    setItems((current) =>
      current.map((item) => item.id === id ? { ...item, status } : item)
    );
    setToast(`Status saved as ${status}`);
  }

  function saveScholarship(form) {
    if (form.id) {
      setItems((current) => current.map((item) => item.id === form.id ? form : item));
      setToast("Scholarship updated successfully");
    } else {
      setItems((current) => [{ ...form, id: Date.now() }, ...current]);
      setToast("Scholarship added successfully");
    }
    setModal(null);
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-mark"><GraduationCap size={20} /></div>
            <div>
              <strong>K12 Hunar</strong>
              <span>Scholarship Management</span>
            </div>
          </div>
          <div className="topbar-meta">
            <span className="saved-dot" />
            Saved locally
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span /> SCHOLARSHIP MANAGEMENT</div>
            <h1>Scholarship Dashboard</h1>
            <p>Manage scholarship opportunities across Bihar, Haryana and Jharkhand.</p>
          </div>
          <button className="primary-btn" onClick={() => setModal({ type: "form", item: { ...emptyForm } })}>
            <Plus size={18} /> Add Scholarship
          </button>
        </section>

        <section className="summary-grid" aria-label="Scholarship summary">
          <SummaryCard
            label="Total Scholarships"
            value={counts.total}
            tone="blue"
            icon={Award}
            active={selectedStatus === "All" && selectedState === "All"}
            onClick={() => { clearFilters(); scrollToRecords(); }}
          />
          <SummaryCard
            label="Published"
            value={counts.Published}
            tone="green"
            icon={Check}
            active={selectedStatus === "Published"}
            onClick={() => selectStatus("Published")}
          />
          <SummaryCard
            label="Draft"
            value={counts.Draft}
            tone="amber"
            icon={Edit3}
            active={selectedStatus === "Draft"}
            onClick={() => selectStatus("Draft")}
          />
          <SummaryCard
            label="Expired"
            value={counts.Expired}
            tone="red"
            icon={FileText}
            active={selectedStatus === "Expired"}
            onClick={() => selectStatus("Expired")}
          />
        </section>

        <section className="records-card" ref={recordsRef}>
          <div className="records-head">
            <div>
              <div className="section-label">SCHOLARSHIP RECORDS</div>
              <h2>Scholarships</h2>
              <p>{visibleItems.length} of {items.length} scholarship records</p>
            </div>
            <div className="state-pills" aria-label="Choose state">
              <button className={selectedState === "All" ? "active" : ""} onClick={() => selectState("All")}>All states</button>
              {STATES.map((state) => (
                <button key={state} className={selectedState === state ? "active" : ""} onClick={() => selectState(state)}>
                  {state}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-caption"><Landmark size={16} /> Choose State</div>
            <div className="select-wrap">
              <select value={selectedState} onChange={(e) => selectState(e.target.value)} aria-label="Choose State">
                <option value="All">All states</option>
                {STATES.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
              <ChevronDown size={16} />
            </div>
            <div className="status-select-wrap">
              <select value={selectedStatus} onChange={(e) => selectStatus(e.target.value)} aria-label="Filter status">
                <option value="All">All statuses</option>
                {STATUSES.map((status) => <option key={status}>{status}</option>)}
              </select>
              <ChevronDown size={16} />
            </div>
            {(selectedState !== "All" || selectedStatus !== "All") && (
              <button className="clear-btn" onClick={clearFilters}>Clear filters</button>
            )}
          </div>

          <div className="flow-note">
            <span>Choose State</span><b>→</b><span>View Scholarships</span><b>→</b><span>Edit Status</span><b>→</b><span>Save Changes</span><b>→</b><span>Preview Card</span>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Scholarship</th>
                  <th>State</th>
                  <th>Applicable Class</th>
                  <th>Application Deadline</th>
                  <th>Status</th>
                  <th className="action-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((item) => (
                  <ScholarshipRow
                    key={item.id}
                    item={item}
                    onStatusChange={updateStatus}
                    onEdit={() => setModal({ type: "form", item: { ...item } })}
                    onPreview={() => setModal({ type: "preview", item })}
                  />
                ))}
              </tbody>
            </table>

            {!visibleItems.length && (
              <div className="empty-state">
                <div className="empty-icon"><FileText size={22} /></div>
                <strong>No scholarships match this filter</strong>
                <span>Clear the filters to view all scholarship records.</span>
                <button className="secondary-btn" onClick={clearFilters}>Clear filters</button>
              </div>
            )}
          </div>

          <div className="records-foot">
            <span>Showing <b>{visibleItems.length}</b> of <b>{items.length}</b> scholarships</span>
            <span>Frontend demo · Changes persist locally</span>
          </div>
        </section>

        <footer className="footer">K12 Hunar · Frontend Developer Assessment · Scholarship CRM Demo</footer>
      </main>

      {modal?.type === "form" && (
        <ScholarshipForm
          item={modal.item}
          onClose={() => setModal(null)}
          onSave={saveScholarship}
        />
      )}

      {modal?.type === "preview" && (
        <Preview
          item={modal.item}
          onClose={() => setModal(null)}
        />
      )}

      {toast && (
        <div className="toast"><CircleCheck size={17} /> {toast}</div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, tone, icon: Icon, active, onClick }) {
  return (
    <button className={`summary-card ${tone} ${active ? "active" : ""}`} onClick={onClick}>
      <div className="summary-top">
        <span>{label}</span>
        <span className="summary-icon"><Icon size={19} /></span>
      </div>
      <strong>{value}</strong>
      <span className="summary-link">{active ? "Showing records" : "View records"} <span>→</span></span>
    </button>
  );
}

function ScholarshipRow({ item, onStatusChange, onEdit, onPreview }) {
  return (
    <tr>
      <td>
        <div className="name-cell">
          <div className="name-icon"><GraduationCap size={16} /></div>
          <div>
            <strong>{item.name}</strong>
            <span>{item.provider}</span>
          </div>
        </div>
      </td>
      <td><span className="state-badge">{item.state}</span></td>
      <td>{item.classLevel}</td>
      <td>
        <span className={item.deadline ? "deadline" : "muted"}>{formatDate(item.deadline)}</span>
      </td>
      <td>
        <div className={`status-control ${item.status.toLowerCase()}`}>
          <span className="status-dot" />
          <select
            value={item.status}
            onChange={(e) => onStatusChange(item.id, e.target.value)}
            aria-label={`Change status for ${item.name}`}
          >
            {STATUSES.map((status) => <option key={status}>{status}</option>)}
          </select>
          <ChevronDown size={13} />
        </div>
      </td>
      <td>
        <div className="row-actions">
          <button className="text-action" onClick={onPreview}><span className="action-icon"><ExternalLink size={14} /></span>Preview</button>
          <button className="text-action" onClick={onEdit}><span className="action-icon"><Edit3 size={14} /></span>Edit</button>
        </div>
      </td>
    </tr>
  );
}

function ScholarshipForm({ item, onClose, onSave }) {
  const [form, setForm] = useState(item);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Scholarship name is required.";
    if (!form.provider.trim()) nextErrors.provider = "Provider name is required.";
    if (!form.classLevel.trim()) nextErrors.classLevel = "Applicable class is required.";
    if (!form.eligibility.trim()) nextErrors.eligibility = "Eligibility criteria is required.";
    if (!form.benefit.trim()) nextErrors.benefit = "Scholarship amount or benefit is required.";
    if (form.link.trim()) {
      try { new URL(form.link); } catch { nextErrors.link = "Enter a valid official application link."; }
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSave({ ...form, name: form.name.trim(), provider: form.provider.trim() });
  }

  return (
    <Modal onClose={onClose} wide={false}>
      <div className="modal-header">
        <div>
          <div className="section-label">SCHOLARSHIP DETAILS</div>
          <h2>{form.id ? "Edit Scholarship" : "Add Scholarship"}</h2>
          <p>Keep the scholarship record clear and student-ready.</p>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
      </div>

      <form onSubmit={submit} className="form">
        <div className="form-grid">
          <Field label="Scholarship name" required error={errors.name} full>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Post-Matric Scholarship" />
          </Field>

          <Field label="State" required>
            <select value={form.state} onChange={(e) => update("state", e.target.value)}>
              {STATES.map((state) => <option key={state}>{state}</option>)}
            </select>
          </Field>

          <Field label="Provider name" required error={errors.provider}>
            <input value={form.provider} onChange={(e) => update("provider", e.target.value)} placeholder="e.g. Government of Bihar" />
          </Field>

          <Field label="Applicable class" required error={errors.classLevel}>
            <input value={form.classLevel} onChange={(e) => update("classLevel", e.target.value)} placeholder="e.g. Class 11-12" />
          </Field>

          <Field label="Status" required>
            <select value={form.status} onChange={(e) => update("status", e.target.value)}>
              {STATUSES.map((status) => <option key={status}>{status}</option>)}
            </select>
          </Field>

          <Field label="Application deadline">
            <div className="deadline-input">
              <CalendarDays size={15} />
              <input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
              {form.deadline && <button type="button" onClick={() => update("deadline", "")}>Clear</button>}
            </div>
          </Field>

          <Field label="Scholarship amount or benefit" required error={errors.benefit} full>
            <input value={form.benefit} onChange={(e) => update("benefit", e.target.value)} placeholder="e.g. Financial support towards education expenses" />
          </Field>

          <Field label="Eligibility criteria" required error={errors.eligibility} full>
            <textarea value={form.eligibility} onChange={(e) => update("eligibility", e.target.value)} placeholder="Describe who can apply..." />
          </Field>

          <Field label="Official application link" error={errors.link} full>
            <input type="url" value={form.link} onChange={(e) => update("link", e.target.value)} placeholder="https://official-application-site.gov.in" />
          </Field>
        </div>

        <div className="modal-footer">
          <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary-btn"><Save size={16} /> Save Changes</button>
        </div>
      </form>
    </Modal>
  );
}

function Field({ label, required, error, full, children }) {
  return (
    <label className={`field ${full ? "full" : ""}`}>
      <span>{label}{required && <b>*</b>}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  );
}

function Preview({ item, onClose }) {
  const isPublished = item.status === "Published";

  return (
    <Modal onClose={onClose} wide>
      <div className="modal-header">
        <div>
          <div className="section-label">STUDENT PREVIEW</div>
          <h2>How this scholarship appears to students</h2>
          <p>A simple student-facing view of the selected scholarship.</p>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
      </div>

      <div className="preview-area">
        <article className="student-card">
          <div className="student-card-top">
            <div className="student-brand"><GraduationCap size={20} /></div>
            <span className={`public-status ${item.status.toLowerCase()}`}>{item.status}</span>
          </div>

          <span className="student-state">{item.state}</span>
          <h1>{item.name}</h1>
          <p className="student-provider">{item.provider}</p>

          <div className="student-meta">
            <div><span>Applicable class</span><strong>{item.classLevel}</strong></div>
            <div><span>Application deadline</span><strong>{formatDate(item.deadline)}</strong></div>
          </div>

          <section>
            <h3>Benefit</h3>
            <p>{item.benefit}</p>
          </section>

          <section>
            <h3>Eligibility</h3>
            <p>{item.eligibility}</p>
          </section>

          <div className="preview-cta">
            {isPublished && item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer">
                Apply / Learn More <ExternalLink size={15} />
              </a>
            ) : (
              <span className="disabled-cta">
                {item.status === "Draft" ? "Applications not yet available" : "Applications closed"}
              </span>
            )}
          </div>
        </article>

        <aside className="preview-note">
          <div className="note-icon"><CircleCheck size={17} /></div>
          <div>
            <strong>Preview only</strong>
            <p>This view demonstrates how the scholarship record can be presented to students. It does not add a separate student-facing system.</p>
          </div>
        </aside>
      </div>
    </Modal>
  );
}

function Modal({ children, wide, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`modal ${wide ? "wide" : ""}`} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

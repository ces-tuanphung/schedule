import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ScheduleCard, { Schedule } from "./item ";

function App() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    email: "",
    reason: "",
  });
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchPage = async () => {
    try {
      const response = await axios.get("http://localhost:3001/schedules");
      setSchedules(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPage();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3001/schedules", formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFilterChange = async (status: string) => {
    try {
      const scheduleFilter = await axios.get(
        "http://localhost:3001/schedules/filter",
        { params: { status } }
      );
      setSchedules(scheduleFilter.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ marginBottom: "2rem" }}>
        <button
          style={{ backgroundColor: "#ffa500" }}
          onClick={() => onFilterChange("PENDING")}
        >
          Pending
        </button>
        <button
          style={{ backgroundColor: "blue", marginTop: "2rem" }}
          onClick={() => onFilterChange("APPROVE")}
        >
          Approve
        </button>
      </div>
      <div
        style={{
          width: "50%",
          height: "700px",
          overflow: "auto",
          marginRight: "4rem",
        }}
      >
        {schedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            refetch={fetchPage}
          />
        ))}
      </div>
      <div
        style={{ width: "500px", height: "500px", backgroundColor: "white" }}
      >
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Appointment Date *</label>
              <input
                type="date"
                id="appointment-date1"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ marginLeft: "2rem" }}>
              <label>Appointment Time *</label>
              <input
                type="time"
                id="appointment-date2"
                required
                onChange={handleChange}
                name="time"
                value={formData.time}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              id="patient-name"
              placeholder="Enter patient name"
              onChange={handleChange}
              name="name"
              value={formData.name}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Patient Email</label>
              <input
                type="email"
                id="patient-email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Reason for Appointment</label>
            <textarea
              id="reason"
              rows={4}
              onChange={handleChange}
              name="reason"
              value={formData.reason}
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

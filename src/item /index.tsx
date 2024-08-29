import axios from "axios";
import "./style.css";

export interface Schedule {
  id: string;
  email: string;
  name: string;
  date: string;
  time: string;
  status: string;
  reason: string;
}

enum Status {
  PENDING = "PENDING",
  APPROVE = "APPROVE",
}

const ScheduleCard = ({
  schedule,
  refetch,
}: {
  schedule: Schedule;
  refetch: () => Promise<void>;
}) => {
  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/schedules/${schedule.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeStatus = async () => {
    try {
      await axios.put(`http://localhost:3001/schedules/${schedule.id}`, {
        status:
          schedule.status === Status.PENDING ? Status.APPROVE : Status.PENDING,
      });
      await refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const isApproved = schedule.status === Status.APPROVE;

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <div className="patient-info">
          <h2 style={{ color: "black" }}>{schedule.name}</h2>
          <div className="appointment-time">
            <span className="icon">🕒</span>
            {schedule.time} {schedule.date}
          </div>
        </div>
        <div className="appointment-actions">
          <button className="btn-cancel" onClick={onDelete}>
            Cancel
          </button>
          <button
            className="btn-confirm"
            style={{
              ...(isApproved && {
                backgroundColor: "blue",
              }),
            }}
            onClick={onChangeStatus}
          >
            {isApproved ? "video call" : "Confirm"}
          </button>
        </div>
      </div>
      <div className="appointment-description">
        <p>{schedule.reason}</p>
      </div>
      <div className="appointment-footer">
        <div
          className="appointment-status"
          style={{
            ...(isApproved && { color: "blue" }),
          }}
        >
          <span
            className="status-dot"
            style={{
              ...(isApproved && {
                backgroundColor: "blue",
              }),
            }}
          ></span>
          {schedule.status}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;

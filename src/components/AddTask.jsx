import { useEffect, useState } from "react";
import "../assets/css/AddTask.css";
import "../assets/css/Register.css";
import { Slider } from "antd";
import { Alert } from "@mui/material";
import { DatePicker, Space, Typography } from "antd";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { HiArrowLongLeft } from "react-icons/hi2";
dayjs.extend(buddhistEra);
const { Title } = Typography;

// Component level locale
const buddhistLocale = {
  ...en,
  lang: {
    ...en.lang,
    fieldDateFormat: "DD-MM-YYYY",
    fieldDateTimeFormat: "DD-MM-YYYY    HH:mm:ss",
    yearFormat: "YYYY",
    cellYearFormat: "YYYY",
  },
};

const globalBuddhistLocale = {
  ...enUS,
  DatePicker: {
    ...enUS.DatePicker,
    lang: buddhistLocale.lang,
  },
};

const marks = {
  1: {
    style: {
      color: "red",
    },
    label: <strong>1</strong>,
  },
  2: {
    style: {
      color: "white",
    },
    label: <strong>2</strong>,
  },
  3: {
    style: {
      color: "white",
    },
    label: <strong>3</strong>,
  },
  4: {
    style: {
      color: "white",
    },
    label: <strong>4</strong>,
  },
  5: {
    style: {
      color: "lightgreen",
    },
    label: <strong>5</strong>,
  },
};

export default function AddTask() {
  const [dead, setDead] = useState("");
  const [wages, setWages] = useState(23);
  const [expertise, setExp] = useState(3);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!dead) {
      setError("Enter Deadline");
      return;
    }
    if (!wages) {
      setError("Enter Working Wages");
      return;
    }
    if (!expertise) {
      setError("Enter Expertise");
      return;
    }
    setError("");
  };

  const [status, setStatus] = useState(false);
  return (
    <>
      {!status && (
        <div onClick={() => setStatus(!status)} className="add-task-btn">
          <span className="add-task-icon">+</span>
          <span className="add-task-text">Add Task</span>
        </div>
      )}

      {status && (
        <>
          <div className="add-con">
            {error != "" && <Alert severity="error">{error}</Alert>}
            <div className="add-box">
              <div className="dead field">
                <div className="data-title">Deadline</div>
                <div className="value">
                  <Space style={{ width: "100%" }} direction="vertical">
                    <DatePicker
                      style={{ width: "100%" }}
                      showTime
                      onChange={(_, str) => setDead(str)}
                    />
                  </Space>
                </div>
              </div>
              <div className="wages field">
                <div className="data-title">Wages</div>
                <div className="value">
                  <input
                    onChange={(e) => setWages(e.target.value)}
                    type="number"
                    name="wages"
                    id="wages"
                    value={wages}
                  />
                </div>
              </div>
              <div className="wages field">
                <div className="data-title">Min Expertise</div>
                <div className="value">
                  <Slider
                    onChange={(e) => {
                      setExp(e);
                    }}
                    marks={marks}
                    step={1}
                    value={expertise}
                    min={1}
                    max={5}
                  />
                </div>
              </div>
              <div onClick={handleSubmit} className="submit field">
                Add Task
              </div>
            </div>
            <div onClick={() => setStatus(!status)} className="exit-add-task">
              <HiArrowLongLeft /> Go Back
            </div>
          </div>
        </>
      )}
    </>
  );
}

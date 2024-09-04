import { useState } from "react";
import "../assets/css/Register.css";
import { Slider } from "antd";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

export default function Register() {

  const naviagte = useNavigate();
  const [addr, setAddr] = useState("");
  const [hours, setHours] = useState(7);
  const [wages, setWages] = useState(23);
  const [expertise, setExp] = useState(3);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if(addr == "") { setError("Connect to MetaMask"); return; };
    if(!hours) { setError("Enter Working Hours"); return; };
    if(!wages) { setError("Enter Working Wages"); return; };
    if(!expertise) { setError("Enter Expertise"); return; };
    setError("");

    naviagte("/dashboard");
  }

  return (
    <>
      <div className="register-box">
        {error != "" && <Alert severity="error">{error}</Alert>}
        <div className="register">
          <div className="address field">
            <div className="data-title">Wallet Address</div>
            <div
              onClick={async () => {
                if(addr != "") return;
                if (!window.ethereum) {
                  setError("MetaMask not MetaMask not available");
                  return;
                }
                const accounts = await window.ethereum
                  .request({ method: "eth_requestAccounts" })
                  .catch((err) => {
                    if (err.code === 4001) {
                      setError("Please connect to MetaMask");
                    } else {
                      setError(err);
                    }
                  });
                // if (!accounts) return;
                const account = accounts[0];
                setAddr(account);
                setError("");
              }}
              className="value"
            >
              {addr ? addr : "Connect to MetaMask"}
            </div>
          </div>
          <div className="hours field">
            <div className="data-title">Working Hours</div>
            <div className="value">
              <input
                onChange={(e) => setHours(e.target.value)}
                type="number"
                name="hours"
                id="hours"
                value={hours}
              />
            </div>
          </div>
          <div className="wages field">
            <div className="data-title">Minimum Wages</div>
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
            <div className="data-title">Expertise</div>
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
          <div onClick={handleSubmit} className="submit field">Register</div>
        </div>
      </div>
    </>
  );
}

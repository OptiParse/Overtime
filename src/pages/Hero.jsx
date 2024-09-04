import "../assets/css/style.css";
import { SiAdguard } from "react-icons/si";

import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      {/* <header className="header" id="header">
        <nav className="navbar container">
          <a href="#" className="brand">
            Brand
          </a>
          <div className="burger" id="burger">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
          <div className="menu" id="menu">
            <ul className="menu-inner">
              <li className="menu-item">
                <a href="#" className="menu-link">
                  Home
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">
                  Feature
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">
                  Pricing
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <button className="switch" id="switch">
            <i className="switch-light bx bx-sun"></i>
            <i className="switch-dark bx bx-moon"></i>
          </button>
        </nav>
      </header> */}
      <main className="main">
        <section className="section banner banner-section">
          <div className="container banner-column">
            <img
              className="banner-image"
              src="https://i.ibb.co/sVqYmS2/Illustration.png"
              alt="Illustration"
            />
            <div className="banner-inner">
              <h1 className="heading-xl">
              <SiAdguard /> Overtime
              </h1>
              <h3 className="heading-l">
                best tool for Managers and Workers with annonimity
                </h3>
              <p className="paragraph">
              The Overtime smart contract manages and allocates tasks among registered workers based on their availability, expertise, and wage expectations. It supports both divisible and non-divisible tasks, making it suitable for scenarios where tasks need to be distributed among multiple workers with varying expertise levels.</p>
              <Link to={"/register"} className="btn btn-darken btn-inline">
                Get Started<i className="bx bx-right-arrow-alt"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

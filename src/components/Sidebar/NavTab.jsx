import { Link } from "react-router-dom";

export default function NavTab(prop) {
  return (
    <Link to={prop.to} children={
      <>
      <prop.icon /> <span className="tab-title">{prop.title}</span> {prop.badge && <span className="tab-badge">{prop.badge}</span>}
      </>
    }/>
  )
}
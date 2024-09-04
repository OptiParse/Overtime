
export default function DataCard(prop) {
  return (
          <div className="data-card">
            <span className="data-card-title">{prop.title}</span>
            <div className="data-card-icon">
              <prop.icon/>
              </div>
            <span className="data-card-data">{prop.data}</span>
          </div>
  )
}
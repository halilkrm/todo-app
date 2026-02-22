const filters = [
  { key: 'all', label: 'Tümü' },
  { key: 'active', label: 'Bekleyenler' },
  { key: 'completed', label: 'Tamamlananlar' },
]

export default function FilterBar({ filter, setFilter, counts, onClearCompleted }) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`filter-tab ${filter === f.key ? 'active' : ''}`}
          >
            {f.label}
            <span className="filter-count">{counts[f.key]}</span>
          </button>
        ))}
      </div>
      {counts.completed > 0 && (
        <button onClick={onClearCompleted} className="clear-btn">
          Tamamlananları Sil
        </button>
      )}
    </div>
  )
}

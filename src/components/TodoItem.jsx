const priorityDot = { low: '#34d399', medium: '#fbbf24', high: '#f87171' }
const priorityLabel = { low: 'Düşük', medium: 'Orta', high: 'Yüksek' }

const getDeadlineInfo = (deadline) => {
  if (!deadline) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(deadline)
  due.setHours(0, 0, 0, 0)
  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return { label: `${Math.abs(diffDays)} gün geçti`, color: '#f87171', urgent: true }
  if (diffDays === 0) return { label: 'Bugün son gün!', color: '#fb923c', urgent: true }
  if (diffDays === 1) return { label: 'Yarın son gün', color: '#fbbf24', urgent: false }
  return {
    label: due.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
    color: '#6b6a74',
    urgent: false
  }
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const dot = priorityDot[todo.priority]
  const label = priorityLabel[todo.priority]
  const deadlineInfo = getDeadlineInfo(todo.deadline)

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label="Tamamla"
      >
        {todo.completed && <span className="check-mark">✓</span>}
      </button>

      <div className="todo-content">
        <div className="todo-title-row">
          <span className="todo-title">{todo.title}</span>
          <span className="priority-dot" style={{ background: dot }} title={label} />
        </div>
        {todo.description && (
          <p className="todo-desc">{todo.description}</p>
        )}
        <div className="todo-meta">
          {deadlineInfo && (
            <span className="todo-deadline" style={{ color: deadlineInfo.color }}>
              {deadlineInfo.urgent ? '⚠ ' : '📅 '}{deadlineInfo.label}
            </span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button onClick={() => onEdit(todo)} className="action-btn edit-btn" aria-label="Düzenle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button onClick={() => onDelete(todo.id)} className="action-btn delete-btn" aria-label="Sil">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

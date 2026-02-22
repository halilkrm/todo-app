import { useState, useEffect } from 'react'

const priorityConfig = {
  low: { label: 'Düşük', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' },
  medium: { label: 'Orta', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' },
  high: { label: 'Yüksek', color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/30' },
}

export default function TodoForm({ onSubmit, editingTodo, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [deadline, setDeadline] = useState('')

  // min değeri bugün (geçmiş tarih seçilemesin)
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title)
      setDescription(editingTodo.description)
      setPriority(editingTodo.priority)
      setDeadline(editingTodo.deadline || '')
    }
  }, [editingTodo])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim(), description: description.trim(), priority, deadline })
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDeadline('')
  }

  const isEditing = !!editingTodo

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-header">
        <span className="form-icon">{isEditing ? '✏️' : '✦'}</span>
        <h2 className="form-title">{isEditing ? 'Görevi Düzenle' : 'Yeni Görev'}</h2>
      </div>

      <div className="field-group">
        <input
          type="text"
          placeholder="Görev başlığı..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="todo-input"
          maxLength={80}
          required
        />
        <textarea
          placeholder="Açıklama (isteğe bağlı)..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="todo-textarea"
          rows={2}
          maxLength={200}
        />
      </div>

      <div className="deadline-group">
        <span className="priority-label">⏰ Bitiş Tarihi</span>
        <input
          type="date"
          value={deadline}
          min={today}
          onChange={e => setDeadline(e.target.value)}
          className="todo-input deadline-input"
        />
        {deadline && (
          <button type="button" className="clear-deadline" onClick={() => setDeadline('')}>✕</button>
        )}
      </div>

      <div className="priority-group">
        <span className="priority-label">Öncelik</span>
        <div className="priority-buttons">
          {Object.entries(priorityConfig).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              onClick={() => setPriority(key)}
              className={`priority-btn ${priority === key ? 'active ' + key : ''}`}
            >
              {cfg.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-actions">
        {isEditing && (
          <button type="button" onClick={onCancelEdit} className="btn-cancel">
            İptal
          </button>
        )}
        <button type="submit" className={`btn-submit ${isEditing ? 'edit' : 'add'}`}>
          {isEditing ? 'Güncelle' : 'Ekle'}
        </button>
      </div>
    </form>
  )
}

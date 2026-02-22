import { useState, useMemo } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import FilterBar from '../components/FilterBar'
import { createTodo } from '../interfaces/Todo'

const STORAGE_KEY = 'todo-app-items'

const loadTodos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export default function TodoPage() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState('all')
  const [editingTodo, setEditingTodo] = useState(null)

  const updateTodos = (newTodos) => {
    setTodos(newTodos)
    saveTodos(newTodos)
  }

  // Ekle
  const handleAdd = ({ title, description, priority }) => {
    const newTodo = createTodo(title, description, priority)
    updateTodos([newTodo, ...todos])
  }

  // Güncelle
  const handleUpdate = ({ title, description, priority, deadline }) => {
    updateTodos(todos.map(t =>
      t.id === editingTodo.id ? { ...t, title, description, priority, deadline } : t
    ))
    setEditingTodo(null)
  }

  // Tamamla/Geri al
  const handleToggle = (id) => {
    updateTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  // Sil
  const handleDelete = (id) => {
    updateTodos(todos.filter(t => t.id !== id))
    if (editingTodo?.id === id) setEditingTodo(null)
  }

  // Tamamlananları toplu sil
  const handleClearCompleted = () => {
    updateTodos(todos.filter(t => !t.completed))
  }

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.completed)
    if (filter === 'completed') return todos.filter(t => t.completed)
    return todos
  }, [todos, filter])

  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }), [todos])

  const completedPercent = todos.length > 0
    ? Math.round((counts.completed / todos.length) * 100)
    : 0

  return (
    <div className="page-wrapper">
      <div className="page-bg" />

      <main className="page-main">
        {/* Header */}
        <header className="page-header">
          <div className="header-top">
            <div className="logo-mark">✦</div>
            <h1 className="page-title">Görevlerim</h1>
          </div>
          <p className="page-subtitle">Bugünü planla, yarını kazan</p>
          {todos.length > 0 && (
            <div className="progress-section">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${completedPercent}%` }}
                />
              </div>
              <span className="progress-text">{completedPercent}% tamamlandı</span>
            </div>
          )}
        </header>

        {/* Form */}
        <section className="form-section">
          <TodoForm
            onSubmit={editingTodo ? handleUpdate : handleAdd}
            editingTodo={editingTodo}
            onCancelEdit={() => setEditingTodo(null)}
          />
        </section>

        {/* List */}
        {todos.length > 0 && (
          <section className="list-section">
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              counts={counts}
              onClearCompleted={handleClearCompleted}
            />
            <TodoList
              todos={filteredTodos}
              filter={filter}
              onToggle={handleToggle}
              onEdit={setEditingTodo}
              onDelete={handleDelete}
            />
          </section>
        )}

        {todos.length === 0 && (
          <div className="welcome-state">
            <p className="welcome-text">Bugün ne yapmak istiyorsun?</p>
          </div>
        )}
      </main>
    </div>
  )
}

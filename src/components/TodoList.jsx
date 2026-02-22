import TodoItem from './TodoItem'

export default function TodoList({ todos, filter, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">◎</div>
        <p className="empty-text">
          {filter === 'all' ? 'Henüz görev yok.' : filter === 'active' ? 'Bekleyen görev yok.' : 'Tamamlanan görev yok.'}
        </p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map((todo, i) => (
        <div
          key={todo.id}
          className="todo-item-wrapper"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  )
}

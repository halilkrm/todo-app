/**
 * @typedef {Object} Todo
 * @property {string} id - Unique identifier
 * @property {string} title - Todo title
 * @property {string} description - Todo description
 * @property {boolean} completed - Completion status
 * @property {'low'|'medium'|'high'} priority - Priority level
 * @property {string} createdAt - ISO date string
 */

export const createTodo = (title, description = '', priority = 'medium') => ({
  id: crypto.randomUUID(),
  title,
  description,
  completed: false,
  priority,
  createdAt: new Date().toISOString(),
})

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="header-icono border-0 bg-transparent"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
      <span>{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
    </button>
  )
}

export default ThemeToggle
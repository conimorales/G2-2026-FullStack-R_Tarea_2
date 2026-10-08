function Button({ children, variant = 'primary', type = 'button', onClick, className = '', ...props }) {
  const base = variant === 'secondary' ? 'btn-outline-secondary' : `btn-${variant}`

  return (
    <button
      type={type}
      className={`btn ${base} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
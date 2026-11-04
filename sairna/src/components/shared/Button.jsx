function Button({
  type = "button",
  color = "primary",
  onClick,
  children,
  variant = "primary",
  radius = "rounded-xl",
  display,
  margin,
  font_size,
  className = "",
}) {
  const styles = {
    primary: {
      primary: "bg-primary text-white hover:bg-primary-deep",
      secondary: "bg-text text-white border-transparent hover:bg-dark-deep/70",
    },
    outline: {
      primary: "bg-white text-primary border-primary hover:bg-primary/10",
      secondary: "bg-white text-text border-grey hover:bg-primary/10 hover:text-primary",
    },
  };

  const buttonStyle = styles[variant]?.[color] || styles.primary.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`border py-2 px-5 ${buttonStyle} ${radius} ${display} ${margin} ${font_size} cursor-pointer transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;

function CustomInput({ label, icon, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-bold text-text flex items-center gap-1">
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className={`flex items-center border rounded-xl px-3 py-3 bg-surface transition-all duration-200 focus-within:border-primary ${error ? 'border-red-500' : 'border-border'} ${className}`}>
        {icon && <span className="text-muted ml-2">{icon}</span>}
        <input
          {...props}
          className="
            w-full bg-transparent outline-none text-sm text-text placeholder:text-muted/60 
            [&:-webkit-autofill]:bg-transparent 
            [&:-webkit-autofill]:text-text
            [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]
          "
        />
      </div>
      
      {error && <span className="text-xs text-red-500 font-bold mt-0.5">{error}</span>}
    </div>
  );
}

export default CustomInput;
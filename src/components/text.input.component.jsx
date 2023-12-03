import React, { useState } from "react";

const TextInput = ({
  name,
  type,
  id,
  value,
  onChange,
  placeholder,
  className,
  icon,
  error,
  helperText,
  defaultValue,
  onBlur
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="w-[100%] mb-4">
      <div className="relative w-[100%]">
        <input
          type={
            type === "password" ? (isPasswordShown ? "text" : "password") : type
          }
          className="input-box"
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          id={id}
          name={name}
          onChange={onChange}
          defaultValue={defaultValue}
        />
        <i className={`fi ${icon} input-icon`} />
        {type === "password" && (
          <i
            className={`fi fi-rr-${
              isPasswordShown ? "eye" : "eye-crossed"
            } input-icon left-[auto] right-4 cursor-pointer`}
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          ></i>
        )}
      </div>
      {error && <p className="text-xl text-red">{helperText}</p>}
    </div>
  );
};

export default TextInput;

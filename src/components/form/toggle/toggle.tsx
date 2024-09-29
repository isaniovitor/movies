import { useEffect, useState } from "react";
import "./styles.css";

type ToggleProps = {
  placeholder: string;
  value: boolean;
  onChange: (options: boolean) => void;
};

export default function Toggle({ placeholder, value, onChange }: ToggleProps) {
  const [isChecked, setIsChecked] = useState(value);

  const handleToggleChange = () => {
    setIsChecked((prev) => !prev);
    onChange(!isChecked);
  };

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggleChange}
        id="toggle"
        className="toggle-switch__checkbox"
      />
      <label htmlFor="toggle" className="toggle-switch__label">
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
      <p>{placeholder}</p>
    </div>
  );
}

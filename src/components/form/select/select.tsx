import { useEffect, useRef, useState } from "react";
import { handleClickOutside } from "../../../utils/utils";
import "./styles.css";

type SelectProps = {
  placeholder: string;
  value: number[];
  onChange: (options: number[]) => void;
  options: { id: number; name: string }[];
};

export default function Select({
  options,
  placeholder,
  value,
  onChange: externalOnChange,
}: SelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (id: number) => {
    const newSelectedOptions = [];

    if (selectedOptions.includes(id)) {
      newSelectedOptions.push(
        ...selectedOptions.filter((optionId) => optionId !== id)
      );
    } else {
      newSelectedOptions.push(...[...selectedOptions, id]);
    }

    externalOnChange(newSelectedOptions);
    setSelectedOptions(newSelectedOptions);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) =>
      handleClickOutside(event, dropdownRef, () => setIsDropdownOpen(false));

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  return (
    <div
      ref={dropdownRef}
      className="select-dropdown"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <div className="select-dropdown__header">
        <div>
          {selectedOptions.length > 0
            ? `${selectedOptions.length} seleted`
            : placeholder}
        </div>
        <span>{isDropdownOpen ? "▲" : "▼"}</span>
      </div>

      {isDropdownOpen && (
        <ul
          className="select-dropdown__list"
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option) => (
            <li
              key={option.id}
              className="select-dropdown__list__item"
              onClick={() => handleOptionClick(option.id)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionClick(option.id)}
              />
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

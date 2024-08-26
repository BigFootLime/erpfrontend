import { Input } from "../../@/componentsui/ui/input";
import { Skeleton } from "../../@/componentsui/ui/skeleton";
import FormLabel from "./FormLabel";
import React, { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react"; // Import the magnifying glass and down arrow icon from lucide-react

function FormAutoComplete({
  label: propsLabel,
  name: propsName,
  type: propsType,
  classNameInput: propsClassNameInput,
  disabled: propsDisabled,
  loading: propsLoading,
  register: propsRegister,
  validation: propsValidation,
  placeholder: propsPlaceholder,
  error: propsError,
  light: propsLight,
  suggestions: propsSuggestions = [], // Array of suggestions
  onInputChange, // Function to call when input changes
  onSelectSuggestion, // Function to call when a suggestion is selected
}) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (userInput && showSuggestions) {
      const filtered = propsSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(userInput.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [userInput, propsSuggestions, showSuggestions]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    onInputChange?.(value);
    if (!showSuggestions) setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
    setShowSuggestions(false);
    onSelectSuggestion?.(suggestion);
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const renderSuggestions = () => {
    if (showSuggestions && userInput && filteredSuggestions.length > 0) {
      return (
        <ul className="border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto bg-white">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      );
    } else if (showSuggestions && !userInput && propsSuggestions.length > 0) {
      return (
        <ul className="border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto bg-white">
          {propsSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="w-full relative">
      <FormLabel
        label={propsLabel}
        name={propsName}
        required={propsValidation?.required}
        className={`${propsLight ? "text-black" : ""}`}
      />
      {propsLoading ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <div className="relative w-full">
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-500" />
            </span>
            <Input
              id={propsName}
              disabled={propsDisabled}
              type={propsType}
              {...propsRegister(propsName, propsValidation)}
              className={`pl-10 pr-10 border rounded-md w-full border-indigo-500 hover:border-indigo-500 focus:border-indigo-500 ${
                propsClassNameInput || ""
              } ${propsError ? "!border-red-500" : ""}`}
              placeholder={propsPlaceholder}
              value={userInput}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={toggleSuggestions}
            >
              <ChevronDown
                className={`text-gray-500 transform transition-transform ${
                  showSuggestions ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {renderSuggestions()}
        </div>
      )}
      {propsError && (
        <span className="text-sm text-red-500">{propsError?.message}</span>
      )}
    </div>
  );
}

export default FormAutoComplete;

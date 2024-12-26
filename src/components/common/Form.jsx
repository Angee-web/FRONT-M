import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  borderRadius, // New prop for controlling border radius
  isBtnDisable,
}) => {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name || ""];

    // Determine the border radius class based on the prop
    const borderRadiusClass =
      borderRadius === "rounded-full" ? "rounded-full" : "rounded-md";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            className={borderRadiusClass} // Apply border radius class
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
              
            }}
          />
        );
        break;
      case "select":
        element = (
          // this is the shacdn select component
          <Select
            onValueChange={(value) => {
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              });
             
            }}
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((option) => (
                    <SelectItem key={option.id} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
             
            }}
            className="resize-none h-32" // Adjust height and disable resizing
          />
        );
        break;
      default:
        element = (
          <Input
            className={borderRadiusClass} // Apply border radius class
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
             
            }}
          />
        );
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <label className="mb-1" htmlFor={controlItem.name}>
              {controlItem.label}
            </label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        // disabled={isBtnDisable}
        type="submit"
        className="mt-2 w-full bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] rounded-full"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;

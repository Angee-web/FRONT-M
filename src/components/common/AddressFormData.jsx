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


const AddressFormData = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  handleClearForm,
  currentEditedId,
  
  // isBtnDisable,
}) => {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name || ""];

    // Determine the border radius class based on the prop
    // const borderRadiusClass =
    //   borderRadius === "rounded-full" ? "rounded-full" : "rounded-md";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            className="p-2 border border-[#797979] rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-gray-500" // Apply border radius class
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
            <SelectTrigger className="p-2 border border-[#797979] rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
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
            className="resize-none h-32 p-2 border border-[#797979] rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            // Adjust height and disable resizing
          />
        );
        break;
      default:
        element = (
          <Input
            className="p-2 border border-[#797979] rounded-lg bg-black text-white  " // Apply border radius class
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
      <div className="flex justify-end gap-2 mt-2">
        <Button
          // disabled={isBtnDisable}
       
          type="submit"
          className=" w-[30%] p-3 bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] rounded"
        >
          
          {currentEditedId !== null ? "Edit " : "Save"}
        </Button>
        <Button
          type="button"
          onClick={handleClearForm}
          className=" w-[30%] p-3 bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] rounded"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddressFormData;

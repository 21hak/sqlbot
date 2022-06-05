import { InputBase } from "@mui/material";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface FormInputTextProps {
  name: string;
  control: Control;
}

const FormInputText: FC<FormInputTextProps> = function FormInputText({
  name,
  control,
}) {
  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputBase
          type="input"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={onChange}
          value={value}
        />
      )}
    />
  );
};
export default FormInputText;

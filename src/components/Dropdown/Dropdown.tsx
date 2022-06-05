import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { FC } from "react";

interface DropdownProps {
  items: string[];
  label?: string;
  onSelect: (item: string) => void;
}
const Dropdown: FC<DropdownProps> = function Dropdown({
  items,
  label,
  onSelect,
}) {
  const [value, setValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    onSelect(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}>
          {items.map((item, index) => (
            <MenuItem value={10} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;

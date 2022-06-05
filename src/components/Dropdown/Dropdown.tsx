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
  initialItem?: string;
  onSelect: (item: string) => void;
}
const Dropdown: FC<DropdownProps> = function Dropdown({
  items,
  label,
  onSelect,
  initialItem,
}) {
  const [value, setValue] = React.useState(initialItem);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    onSelect(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="db-dropdwon-label">{label}</InputLabel>
        <Select
          id="db-dropdwon"
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

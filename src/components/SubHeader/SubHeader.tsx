import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Paper, styled } from "@mui/material";
import MuiToolBar, { ToolbarProps } from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { databaseState, naturalLanguageState } from "../../atoms";
import Dropdown from "../Dropdown/Dropdown";
import FormInputText from "../FormInputText/FormInputText";

const SubHeaderWrapper = styled(MuiToolBar)<ToolbarProps>(({}) => ({
  backgroundColor: "white",
  alignItems: "stretch",
}));

interface SubHeaderProps {}

const SubHeader: FC<SubHeaderProps> = function SubHeader({ children }) {
  const [database, setDatabase] = useRecoilState(databaseState);
  const [naturalLanguage, setNaturalLanguage] =
    useRecoilState(naturalLanguageState);
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data: any) => {
    setNaturalLanguage(data.sql);
  };

  return (
    <SubHeaderWrapper sx={{ marginTop: "68px", p: 1 }}>
      <Box sx={{ flex: "0 1 120px", marginRight: 1 }}>
        <Dropdown
          items={["default"]}
          label={"database"}
          initialItem={database}
          onSelect={setDatabase}
        />
      </Box>
      <Paper
        variant="outlined"
        elevation={0}
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          flex: "1 1",
          display: "flex",
          alignItems: "center",
        }}>
        <FormInputText
          name="sql"
          control={control}
          defaultValue={naturalLanguage}
          placeholder="Search"
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </SubHeaderWrapper>
  );
};
export default SubHeader;

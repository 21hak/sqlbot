import { Button, styled, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiToolBar, { ToolbarProps } from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import BasicMenu from "./Menu";

interface HeaderProps {}

interface AppBarProps extends MuiAppBarProps {}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const SubHeader = styled(MuiToolBar)<ToolbarProps>(({}) => ({
  backgroundColor: "white",
}));

const pages = ["Explore", "Gather", "Analyze"];

const Header: FC<HeaderProps> = function Header({}) {
  return (
    <AppBar position="absolute">
      <Toolbar
        sx={{
          pr: "24px",
        }}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ pr: 1 }}>
          SQLBot
        </Typography>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          {pages.map((page) => (
            <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
              {page}
            </Button>
          ))}
        </Box>
      </Toolbar>
      <SubHeader variant="dense">
        <BasicMenu />
        <BasicMenu />
        <BasicMenu />
      </SubHeader>
    </AppBar>
  );
};

export default Header;

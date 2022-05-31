import { Button, styled, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { FC } from "react";

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

const Header: FC<HeaderProps> = function Header({}) {
  return (
    <AppBar position="absolute">
      <Toolbar
        sx={{
          pr: "24px",
        }}>
        <Link href="/">
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ pr: 1, cursor: "pointer" }}>
            SQLBot
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Link href="/">
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              schema
            </Button>
          </Link>
          <Link href="/dependency">
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              dependency
            </Button>
          </Link>
          <Link href="/beamSearch">
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              beam search
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

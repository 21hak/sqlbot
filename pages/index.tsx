import Schema from "@/components/Schema";
import SideBar from "@/components/SideBar";
import SubHeader from "@/components/SubHeader/SubHeader";
import Box from "@mui/material/Box";
import type { NextPage } from "next";
import React from "react";

const SchemaPage: NextPage = () => {
  return (
    <Box>
      <SubHeader />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <Schema />
        </Box>
      </Box>
    </Box>
  );
};

export default SchemaPage;

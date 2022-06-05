import Candidates from "@/components/Candidates/Candidates";
import SubHeader from "@/components/SubHeader/SubHeader";
import VectorRepresentation from "@/components/VectorRepresentation/VectorRepresentation";
import Box from "@mui/material/Box";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        overflow: "auto",
      }}>
      <SubHeader />
      <Box
        sx={{
          display: "flex",
          height: "100%",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}>
        <Box sx={{ width: "40%", height: "100%", p: 1 }}>
          <Candidates />
        </Box>

        <Box sx={{ width: "60%", height: "100%", p: 1, position: "relative" }}>
          <VectorRepresentation />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;

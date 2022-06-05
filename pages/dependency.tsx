import Box from "@mui/material/Box";
import { NextPage } from "next";
import Candidates from "../src/components/Candidates/Candidates";
import VectorRepresentation from "../src/components/VectorRepresentation/VectorRepresentation";

const Page: NextPage = () => {
  // const [candidates, setCandidates] = useState()
  // const { data } = useCandidates();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        paddingTop: "116px",
        display: "flex",
        height: "100vh",
        overflow: "auto",
      }}>
      <Box sx={{ width: "40%", height: "100%", p: 1 }}>
        <Candidates />
      </Box>

      <Box sx={{ width: "60%", height: "100%", p: 1, position: "relative" }}>
        <VectorRepresentation />
      </Box>
    </Box>
  );
};

export default Page;

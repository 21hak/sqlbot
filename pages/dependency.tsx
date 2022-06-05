import Box from "@mui/material/Box";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { dependencyNaturalLanguage, naturalLanguageState } from "../src/atoms";
import Candidates from "../src/components/Candidates/Candidates";
import SubHeader from "../src/components/SubHeader/SubHeader";
import VectorRepresentation from "../src/components/VectorRepresentation/VectorRepresentation";

const Page: NextPage = () => {
  const [naturalLanguage, setNaturalLanguage] = useRecoilState(
    naturalLanguageState
  );
  // const [candidates, setCandidates] = useState()
  // const { data } = useCandidates();

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        overflow: "auto",
      }}>
      <SubHeader setNaturalLanguage={setNaturalLanguage} />
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

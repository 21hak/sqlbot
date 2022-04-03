import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export namespace S {
  export const StyledCard = styled(Card)`
    .selected--partial {
      border: 1px dashed;
    }
    .selected--full {
      border: 1px solid;
    }
  `;
}

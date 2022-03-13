import styled from "@emotion/styled";

export namespace S {
  export const TableNodeWidgetWrapper = styled.div<{ size: number }>`
    background-color: white;
    position: relative;
    width: ${(props) => props.size}px;
    // height: ${(props) => props.size}px;
  `;

  export const TableName = styled.div`
    padding: 8px;
  `;

  export const TableColumns = styled.div`
    padding: 8px;
  `;
  export const TableColumn = styled.div`
    display: flex;
  `;
}

// export default S;

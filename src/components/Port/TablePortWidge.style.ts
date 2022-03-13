import styled from "@emotion/styled";

namespace S {
	export const Port = styled.div`
		width: 16px;
		height: 16px;
		z-index: 10;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		cursor: pointer;
		&:hover {
			background: rgba(0, 0, 0, 1);
		}
	`;
}
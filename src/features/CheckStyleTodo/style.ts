import { SxProps } from "@mui/material";

export const rootSx: SxProps = {
	display: "flex",
	flexDirection: "column",
	"& .CheckStyleTodo-body": {
		p: 1,
		border: "1px solid red",
		width: 500,
		height: 600,
	},
};

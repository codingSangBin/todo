import {
	Box,
	Button,
	Checkbox,
	Stack,
	SxProps,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

// props 값 전달 방식
type Props = {
	idx: number;
	data: string;
	onSubmitDel: (value: number) => void;
	onSubmitUpt: (value: string, idx: number) => void;
	checkedList: number[];
	toggleCheck: (requestId: number, checked: boolean) => void;
};
const rootSx: SxProps = {};
export default function CheckTodoList(props: Props) {
	const { idx, data, onSubmitDel, onSubmitUpt, checkedList, toggleCheck } =
		props;
	// 수정 버튼 true/false
	const [uptTf, setUptTf] = useState<boolean>(false);
	// 업데이트 데이터 상태관리
	const [uptData, setUptData] = useState<string>(data);

	return (
		<Box sx={rootSx} className="TodoList-root">
			<Stack
				key={idx}
				justifyContent="space-between"
				direction="row"
				my={0.5}
				alignItems="center">
				<Stack direction="row" spacing={2} alignItems="center">
					<Checkbox
						size="small"
						checked={checkedList.includes(idx)}
						onChange={(e, checked) => toggleCheck(idx, checked)}
					/>
					<Box>{idx + 1}</Box>
					{/* uptTf === true 이면 text창으로 수정 // false이면 원본 데이터 */}
					{uptTf ? (
						<TextField
							value={uptData}
							onChange={(e) => setUptData(e.target.value as string)}
						/>
					) : (
						<Typography variant="body1">{data}</Typography>
					)}
				</Stack>
				<Stack direction="row" spacing={1}>
					{/* uptTf===true 이면 저장 // false 이면 수정 */}
					{uptTf ? (
						<Button
							onClick={() => {
								onSubmitUpt(uptData, idx);
								setUptTf(false);
							}}
							variant="outlined">
							저장
						</Button>
					) : (
						<Button onClick={() => setUptTf((p) => !p)} variant="outlined">
							수정
						</Button>
					)}
					<Button variant="outlined" onClick={() => onSubmitDel(idx)}>
						삭제
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
}

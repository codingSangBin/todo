import { Box, Button, Stack, TextField } from "@mui/material";
import { rootSx } from "./style";
import { KeyboardEvent, useEffect, useState } from "react";
import TodoList from "./components/TodoList";

export default function MainHome() {
	// 할일 목록 추가 입력데이터
	const [data, setData] = useState<string>();
	// 리스트 목록
	const [todo, setTodo] = useState<string[]>([]);

	// 추가 입력창 리셋
	useEffect(() => {
		setData("");
	}, [todo]);

	// 추가 버튼 클릭
	const handleClickAdd = () => {
		if (!data) return;
		// 새로운 배열에 기존배열 + data
		const newValue = [...todo, data];
		// 다시 기존 리스트 목록 todo에 전달
		setTodo(newValue);
	};

	// 삭제 버튼 클릭
	const handleClickDel = (index: number) => {
		// 파라미터로 받은 index값과 리스트 목록에 index값과
		// 일치하지 않은 녀석들만 담아서 setTodo에 전달
		const delData = todo.filter((el, idx) => idx !== index);
		setTodo(delData);
	};

	// 수정 버튼 클릭
	const handleClickUpt = (data: string, idx: number) => {
		// todo의 데이터를 그대로 새로운 배열을 하나 생성
		const newTodo = [...todo];
		// 새로운 배열에서 index 에서 1개만 data로 제거 후 변경
		newTodo.splice(idx, 1, data);
		// setTodo에 newTodo 전달
		setTodo(newTodo);
	};

	// 엔터키 클릭
	const handleClickEnter = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			handleClickAdd();
		}
	};
	return (
		<Box className="MainHome-root" sx={rootSx}>
			<Stack justifyContent="center" alignItems="center">
				<Box className="MainHome-body">
					할일 목록
					<Stack direction="row">
						<TextField
							fullWidth
							size="small"
							value={data}
							onChange={(e) => setData(e.target.value as string)}
							onKeyPress={(e) => handleClickEnter(e)}
						/>
						<Stack>
							<Button
								onClick={() => {
									handleClickAdd();
								}}>
								추가
							</Button>
						</Stack>
					</Stack>
					{/* map 사용시 key값은 필수 조건 */}
					<Box sx={{ height: 550, overflow: "auto" }}>
						{todo.map((el, idx) => {
							return (
								<TodoList
									data={el}
									idx={idx}
									key={idx}
									onSubmitDel={handleClickDel}
									onSubmitUpt={(value, idx) => handleClickUpt(value, idx)}
								/>
							);
						})}
					</Box>
				</Box>
			</Stack>
		</Box>
	);
}

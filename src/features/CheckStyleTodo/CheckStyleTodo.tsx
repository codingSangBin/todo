import { Box, Button, Checkbox, Stack, TextField } from "@mui/material";
import { rootSx } from "./style";
import { KeyboardEvent, useEffect, useState } from "react";
import CheckTodoList from "./components/CheckTodoList";

export default function CheckStyleTodo() {
	// 할일 목록 추가 입력데이터
	const [data, setData] = useState<string>();
	// 리스트 목록
	const [todo, setTodo] = useState<string[]>([]);
	// 체크된 녀석들 상태관리
	const [checkedList, setCheckedList] = useState<number[]>([]);

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

	// 전체 체크 핸들러
	const allCheckedHandle = (checked: boolean) => {
		if (checked) {
			// 체크이면 목록에 전체 index값 checkedList에 저장
			setCheckedList(todo.map((el, idx) => idx));
		} else {
			// 아니면 리셋
			setCheckedList([]);
		}
	};

	// 개별 체크 핸들러
	const checkHandle = (tmplIdValue: number, checked: boolean) => {
		if (checked) {
			// 체크이면 checkedList에 index 값 저장
			setCheckedList((p) => [...p, tmplIdValue]);
		} else {
			// 체크 헤제시 다시 해당 index값 삭제
			setCheckedList((p) => p.filter((el) => el !== tmplIdValue));
		}
	};

	// 선택 항목 삭제
	const chekHandleDel = () => {
		// 배열이 비어있으면 return
		if (checkedList.length === 0) {
			return;
		}
		// todo데이터로 새로운 배열 생성
		const newTodo = [...todo];
		// 선택된 index를 제외한 녀석으로 updatedTodo 변수 생성
		const updatedTodo = newTodo.filter((el, idx) => !checkedList.includes(idx));
		// setTodo에 데이터 전달
		setTodo(updatedTodo);
		// 체크리스트 리셋
		setCheckedList([]);
	};
	return (
		<Box className="CheckStyleTodo-root" sx={rootSx}>
			<Stack justifyContent="center" alignItems="center">
				<Box className="CheckStyleTodo-body">
					할일 목록
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between">
						<TextField
							fullWidth
							size="small"
							value={data}
							onChange={(e) => setData(e.target.value as string)}
							onKeyPress={(e) => handleClickEnter(e)}
						/>
						<Stack direction="row" alignItems="center">
							<Button
								onClick={() => {
									handleClickAdd();
								}}>
								추가
							</Button>
						</Stack>
					</Stack>
					<Stack direction="row" alignItems="center" my={1}>
						<Checkbox
							size="small"
							onChange={(_, checked) => allCheckedHandle(checked)}
						/>
						<Box sx={{ mr: 2 }}>전체 선택</Box>
						<Button variant="contained" onClick={() => chekHandleDel()}>
							선택항목 삭제
						</Button>
					</Stack>
					{/* map 사용시 key값은 필수 조건 */}
					<Box sx={{ height: 490, overflow: "auto" }}>
						{todo.map((el, idx) => {
							return (
								<CheckTodoList
									data={el}
									idx={idx}
									key={idx}
									onSubmitDel={handleClickDel}
									onSubmitUpt={(value, idx) => handleClickUpt(value, idx)}
									checkedList={checkedList}
									toggleCheck={checkHandle}
								/>
							);
						})}
					</Box>
				</Box>
			</Stack>
		</Box>
	);
}

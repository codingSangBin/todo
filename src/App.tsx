import { useState } from "react";
import MainHome from "./features/MainHome/MainHome";
import { Button } from "@mui/material";
import CheckStyleTodo from "./features/CheckStyleTodo/CheckStyleTodo";

function App() {
	const [todoStyleChangeTf, setTodoStyleChangeTf] = useState<boolean>(false);
	return (
		<div className="App">
			<header className="App-header">
				<body>
					<Button
						variant="outlined"
						onClick={() => setTodoStyleChangeTf((d) => !d)}>
						{todoStyleChangeTf ? "기본방식으로 변경" : "체크방식으로 변경"}
					</Button>
					{todoStyleChangeTf ? <CheckStyleTodo /> : <MainHome />}
				</body>
			</header>
		</div>
	);
}

export default App;

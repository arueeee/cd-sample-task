import React from "react";
import Header from "./components/common/Header";
import Content from "./components/common/Content";

function App() {
	return (
		<div className="App">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
			/>
			<Header />
			<Content />
		</div>
	);
}

export default App;

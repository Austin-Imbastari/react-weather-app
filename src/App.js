import React, { useEffect, useState } from "react";
// components
import Weather from "./components/Weather";
//styles
import GlobalStyles from "./Global.styles";

function App() {
    return (
        <>
            <GlobalStyles />
            <Weather />
        </>
    );
}

export default App;

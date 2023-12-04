import styled, { ThemeProvider } from "styled-components"
import Menu from "./components/Menu"
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Video from "./pages/Video.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Search from "./pages/Search.jsx";


const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 6;
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text}
`;

const Wrapper = styled.div`
  padding: 22px 36px;
`;


function App() {
  
  const [darkMode, setDarkMode] = useState(true)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

    <Container>
      <BrowserRouter>
    <Menu setDarkMode={setDarkMode} darkMode={darkMode} />
    <Main>
      <Navbar />
      <Wrapper>
        <Routes>
        <Route path="/">
        <Route index element={<Home type="random" />} />
        <Route path="trends" element={<Home type="trend" />} />
        <Route path="subscriptions" element={<Home type="sub" />} />
        <Route path="search" element={<Search />} />
        <Route path="signin" element={<Login />} />
        <Route path="video">
        <Route path=":id" element={<Video />} />
        </Route>
        </Route>
        </Routes>
      </Wrapper>
    </Main>
    </BrowserRouter>
    </Container>
    
    </ThemeProvider>
  )
}

export default App

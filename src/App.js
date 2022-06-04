import "./App.css";
import SideBar from "./SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Chat from "./Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";
import { auth } from "./firebase";
import Spinner from "react-spinkit";
function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingCont>
          <img
            src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAKedOLS2OOXtmIHu0Tf1TmWITVrHNktn-MVXK3XRjwf4YA%3Ds900-c-k-c0x00ffffff-no-rj&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCY3YECgeBcLCzIrFLP4gblw&tbnid=vb6qmI-8__pmYM&vet=12ahUKEwjunoKfvZH4AhX8iOYKHeM6BlwQMygBegUIARDXAQ..i&docid=paK3ga2d0TRviM&w=900&h=900&q=slack%20image&ved=2ahUKEwjunoKfvZH4AhX8iOYKHeM6BlwQMygBegUIARDXAQ"
            alt=""
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingCont>
      </AppLoading>
    );
  }
  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />

            <AppBody>
              <SideBar />
              <Routes>
                <Route path="/" element={<Chat />}></Route>
              </Routes>
            </AppBody>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingCont = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

import { Button } from "@material-ui/core";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { auth, db } from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
function ChatInput({ chatRef, ChannelName, ChannelId }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const sendMessage = (e) => {
    e.preventDefault();

    if (!ChannelId) {
      return false;
    }
    db.collection("rooms").doc(ChannelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
    setInput("");
  };
  return (
    <ChatInputCont>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${ChannelName} `}
        ></input>
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputCont>
  );
}

export default ChatInput;
const ChatInputCont = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none !important
     ;
  }
`;

import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "./features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import Message from "./Message";

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useCollection(
    roomId && db.collection("rooms").doc(roomId)
  );
  console.log(roomId, "edwei");
  const [roomMessage, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);
  return (
    <ChatCont>
      <>
        {roomDetails && roomMessage && (
          <>
            <Header>
              <HeaderLeft>
                <h4>
                  <strong>#{roomDetails?.data().name}</strong>
                </h4>
                <StarBorderOutlined />
              </HeaderLeft>

              <HeaderRight>
                <p>
                  <InfoOutlined /> Details
                </p>
              </HeaderRight>
            </Header>
            <ChatMessages>
              {roomMessage?.docs.map((doc) => {
                const { message, timestamp, user, userImage } = doc.data();

                return (
                  <Message
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                  />
                );
              })}
              <ChatBottom ref={chatRef} />
            </ChatMessages>

            <ChatInput
              chatRef={chatRef}
              ChannelName={roomDetails?.data().name}
              channelId={roomId}
            />
          </>
        )}
      </>
    </ChatCont>
  );
}

export default Chat;
const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
const ChatMessages = styled.div``;
const HeaderLeft = styled.div`
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const ChatCont = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

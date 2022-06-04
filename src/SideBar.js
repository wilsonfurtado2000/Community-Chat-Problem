import styled from "styled-components";
import React from "react";
import CreateIcon from "@material-ui/icons/Create";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SideBarOption from "./SideBarOption";
import {
  Add,
  Apps,
  BookmarkBorder,
  Drafts,
  ExpandLess,
  ExpandMore,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function SideBar() {
  const [user] = useAuthState(auth);
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  // console.log(channels);
  return (
    <SideBarCont>
      <SideBarHeader>
        <SideBarInfo>
          <h2>Wilson Furtado</h2>
          <h3>
            <FiberManualRecordIcon />
            Wilson Furtado
          </h3>
        </SideBarInfo>
        <CreateIcon />
      </SideBarHeader>
      <SideBarOption Icon={InsertComment} title="Threads" />
      <SideBarOption Icon={Inbox} title="Mentions & reactions" />
      <SideBarOption Icon={Drafts} title="Saved Items" />
      <SideBarOption Icon={BookmarkBorder} title="Channel Browser" />
      <SideBarOption Icon={PeopleAlt} title="People & user groups" />
      <SideBarOption Icon={Apps} title="Apps" />
      <SideBarOption Icon={FileCopy} title="File Browser" />
      <SideBarOption Icon={ExpandLess} title="Show less" />

      <hr />
      <SideBarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SideBarOption Icon={Add} addChannelOption title="Add Channel" />

      {channels?.docs.map((doc) => {
        {
          console.log(doc.id, "fedief");
        }
        return (
          <SideBarOption key={doc.id} id={doc.id} title={doc.data().name} />
        );
      })}
    </SideBarCont>
  );
}

export default SideBar;
const SideBarCont = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  margin-top: 60px;
  border-top: 1px solid #49274b;
  max-width: 260px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;
const SideBarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SideBarInfo = styled.div`
  flex: 1;

  > h2 {
    font: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;

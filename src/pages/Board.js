import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

const Board = () => {
  const [Blist, setBlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    boardList();
  }, []);

  /*
    리스트 호출
  */
  const boardList = async () => {
    const response = await axios.get("/boardList", {
      params: {
        id: "지으닝",
      },
    });
    setBlist(response.data);
  };

  const boardWriting = async () => {
    debugger;
    console.log(textContent);
    if (textContent !== "") {
      await axios.post("/boardInsert", null, {
        params: {
          boardId: "1",
          id: "지으닝",
          contents: "123",
        },
      });
      setOpen(false);
    }
  };

  /*
    체크 이벤트 기능 
  */
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  /*
    글 쓰기 기능 
  */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*
    글 삭제 기능 
  */
  const handleRemove = async () => {
    if (checked.length > 0) {
      axios.delete("boardDelete", {
        params: {
          boardList: checked.map((item) => item.boardSeq).join("|") + "|",
          id: "지으닝",
        },
      });
    }
  };

  return (
    <>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {Blist.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value.boardSeq}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={value.contents} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button variant="outlined" onClick={handleClickOpen}>
        글쓰기
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="outlined" onClick={handleRemove}>
        삭제
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <TextField
            id="outlined-multiline-flexible"
            label="글작성하기"
            multiline
            maxRows={4}
            onChange={(e) => {
              setTextContent(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={boardWriting} autoFocus>
            {" "}
            저장{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Board;

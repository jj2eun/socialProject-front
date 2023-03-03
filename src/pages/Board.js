import axios from "axios";
import React, { useEffect, useState } from "react"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Button } from "@mui/material";

const Board = () => {

  const [Blist, setBlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [checked, setChecked] = React.useState([]);

  useEffect(()=>{
    boardList();
  },[]);

  /*
    리스트 호출
  */
  const boardList = async () => {

    const response = await axios.get('/boardList', {
        params: {
            id: '지으닝'
        }
    });
    setBlist(response.data);
  }

  const boardWriting = async () =>{
    if(textContent !== ""){
      await axios.post('/boardInsert',{
        params:{
          boardId : ''
          ,id : ''
          ,contents :''
        }
      })
    }   
  }

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
  const handleClickOpen = () =>{

  }

  /*
    글 삭제 기능 
  */
  const handleRemove = () => {
    console.log(checked);
  }

  return(
    <>
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {Blist.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
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
    </>
  ) 
}

export default Board;
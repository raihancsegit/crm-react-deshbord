import React from 'react';
import  { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { getAllOrganization,deleteOrganization } from '../../service/api';

const options = [
  'None',
  'Edit Data',
  'Delete Data',
  'Show Data',
];

const ITEM_HEIGHT = 48;

 const ActionButton = ({getTheId}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState();
  const [setEditOpen, setEditsetEditOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  
  const showCLickClose = () => {
    setEditsetEditOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    //console.log(event);
  };

  const handleClose = async (option) => {
    console.log(option);
    //edit data
    if(option === 'Edit Data'){
      setEditsetEditOpen(true);
    }

    //delete data
    if(option === 'Delete Data'){
      const data = await deleteOrganization(getTheId);
      if(data){
        alert("Are you sure delete this data")
      }
       history.push('/');
    }

    //console.log(getTheId);
    setAnchorEl();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={(() =>handleClose(option))}>
            {option}
          </MenuItem>
        ))}
      </Menu>

        <Dialog open={setEditOpen} onClose={showCLickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Organization</DialogTitle>
                
                <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText>
                    Show Data {getTheId}
                </DialogContent>
                <DialogActions>
                <Button onClick={showCLickClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={showCLickClose} color="primary">
                    Submit
                </Button>
                </DialogActions>
        </Dialog>
    </div>
  );
}
export default ActionButton;
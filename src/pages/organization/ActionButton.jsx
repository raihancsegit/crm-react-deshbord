import React from 'react';
import  { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Grid,Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAllOrganization,deleteOrganization,updateAllOrganization,getIdOrganization} from '../../service/api';

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  buttonClass: {
    float: "right",
  },
  cusAccr: {
      backgroud:'red'
  },
  heading: {
      fontSize: 13,
      fontWeight:'bold'
  },
  input: {
      border: '1px solid #ced4da',
      fontSize: 16,
  }

}))

const options = [
  'None',
  'Edit Data',
  'Delete Data',
  'Show Data',
];

const ITEM_HEIGHT = 48;

 const ActionButton = ({getTheId,name,phone,fax,website,linkdin,facebook,twitter,emailDomain,billingAddress,billingCity,billingState,billingPostalCode,billingCountry,description,tags}) => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState();
    const [setEditOpen, setEditsetEditOpen] = React.useState(false);
    const [OrganizationsById, setOrganization] = useState();
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [expanded1, setExpanded1] = React.useState('panel1');
    const [expanded2, setExpanded2] = React.useState('panel2');
    const [expanded3, setExpanded3] = React.useState('panel3');
    const open = Boolean(anchorEl);

    const handleExpandChange1 = (pa) => (event, newExpanded1) => {
      setExpanded1(newExpanded1 ? pa : false);
    };
    const handleExpandChange2 = (pan) => (event, newExpanded2) => {
      setExpanded2(newExpanded2 ? pan : false);
    };
    const handleExpandChange3 = (pane) => (event, newExpanded3) => {
      setExpanded3(newExpanded3 ? pane : false);
    };
  
    const handleMaxWidthChange = (event) => {
      setMaxWidth(event.target.value);
    };

    const handleUpdateOrganizationChange = (e) => {
      setOrganization({ ...OrganizationsById, [e.target.name]: e.target.value }); 
    }

  
    const showCLickClose = () => {
      setEditsetEditOpen(false);
    };
    
    const updateCLickClose = () => {
      
      const update = updateAllOrganization(getTheId,OrganizationsById);
        if(update){
          history.push('/');
        }

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
          let data = await getIdOrganization(getTheId);
          setOrganization(data.organaization);
          console.log("id Data " + data.organaization.organaizationName);
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

        <Dialog open={setEditOpen} onClose={showCLickClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth}>
                <DialogTitle id="form-dialog-title">Edit Organization</DialogTitle>
                
                <DialogContent>
                    Show Data {getTheId}
                    <Accordion expanded={expanded1 === 'panel1'} onChange={handleExpandChange1('panel1')}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className={classes.cusAccr}
                          >
                        <Typography className={classes.heading}> ORGANIZATION NAME</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    name='organaizationName'
                                    type="text"
                                    variant="outlined"
                                    value={OrganizationsById ? OrganizationsById.organaizationName : name}
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    fullWidth
                                />
                           
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded2 === 'panel2'} onChange={handleExpandChange2('panel2')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.cusAccr}
                    >
                    <Typography className={classes.heading}>ORGANIZATION CONTACT DETAILS</Typography>
                    </AccordionSummary>
                        <AccordionDetails>
                            <Box className={classes.component}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="phone"
                                        label="Phone"
                                        name="phone"
                                        type="text"
                                        variant="outlined"
                                        onChange={(e) => handleUpdateOrganizationChange(e)}
                                        value={OrganizationsById ? OrganizationsById.phone : phone}
                                        fullWidth
                                    />

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="fax"
                                    label="Fax"
                                    name="fax"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.fax : fax}
                                    fullWidth
                                />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="website"
                                label="Website Url"
                                name="website"
                                type="text"
                                variant="outlined"
                                onChange={(e) => handleUpdateOrganizationChange(e)}
                                value={OrganizationsById ? OrganizationsById.website : website}
                                fullWidth
                            />
                            <TextField
                                    autoFocus
                                    margin="dense"
                                    id="linkdin"
                                    label="Linkdin Url"
                                    name="linkdin"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.linkdin : linkdin}
                                    fullWidth
                                />
                            
                            <TextField
                                    autoFocus
                                    margin="dense"
                                    id="facebook"
                                    label="Facebook Url"
                                    name="facebook"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.facebook : facebook}
                                    fullWidth
                                />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="twitter"
                                label="Twitter Url"
                                name="twitter"
                                type="text"
                                variant="outlined"
                                onChange={(e) => handleUpdateOrganizationChange(e)}
                                value={OrganizationsById ? OrganizationsById.twitter : twitter}
                                fullWidth
                            />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded3 === 'panel3'} onChange={handleExpandChange3('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.cusAccr}

                        >
                         <Typography className={classes.heading}> ADDRESS INFORMATION</Typography>
                        </AccordionSummary>
                            <AccordionDetails>
                            <Box className={classes.component}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="emailDomain"
                                    label="Email Domain"
                                    name="emailDomain"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.emailDomain : emailDomain}
                                    fullWidth
                                />

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="billingAddress"
                                    label="Billing Address"
                                    name="billingAddress"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.billingAddress : billingAddress}
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="billingCity"
                                    label="Billing City"
                                    name="billingCity"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.billingCity : billingCity}
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="billingState"
                                    label="Billing State"
                                    name="billingState"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.billingState : billingState}
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="billingPostalCode"
                                    label="Billing PostalCode"
                                    name="billingPostalCode"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.billingPostalCode : billingPostalCode}
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="billingCountry"
                                    label="Billing Country"
                                    name="billingCountry"
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.billingCountry : billingCountry}
                                    fullWidth
                            />
                            </Box>
                           
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.cusAccr}

                             >
                            <Typography className={classes.heading}>  DESCRIPTION INFORMATION</Typography>
                            </AccordionSummary>
                        <AccordionDetails>
                        
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label="Description"
                                    name="description"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.description : description}
                                    fullWidth
                                />
                           
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.cusAccr}

                             >
                            <Typography className={classes.heading}>TAG INFORMATION</Typography>
                            </AccordionSummary>
                        <AccordionDetails>
                        
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="tags"
                                    label="Tags"
                                    name="tags"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleUpdateOrganizationChange(e)}
                                    value={OrganizationsById ? OrganizationsById.tags : tags}
                                    fullWidth
                                />
                           
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <DialogActions>
                <Button onClick={showCLickClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={updateCLickClose} color="primary" >
                    Update
                </Button>
                </DialogActions>
        </Dialog>
    </div>
  );
}
export default ActionButton;
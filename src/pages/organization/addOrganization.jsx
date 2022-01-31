import React from 'react'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid,Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {createOrganization} from '../../service/api';


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

const AddOrganization = () => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [organization, setOrganization] = useState();
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [expanded1, setExpanded1] = React.useState('panel1');
    const [expanded2, setExpanded2] = React.useState('panel2');
    const [expanded3, setExpanded3] = React.useState('panel3');

    const saveOrganization = async () => {
        await createOrganization(organization);
        history.push('/');
        setOpen(false);
    }

    const handleSumitOrganizationChange = (e) => {
        setOrganization({ ...organization, [e.target.name]: e.target.value });
        
    }

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

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.buttonClass}>
                New Organization
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth}>
                <DialogTitle id="form-dialog-title">Add Organization</DialogTitle>
                
                <DialogContent>
               
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                        onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
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
                                    onChange={(e) => handleSumitOrganizationChange(e)}
                                    fullWidth
                                />
                           
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => saveOrganization()} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddOrganization

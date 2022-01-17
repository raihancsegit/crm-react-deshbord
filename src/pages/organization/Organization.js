import React from "react";
import { getAllOrganization } from '../../service/api';
import { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// components
import PageTitle from "../../components/PageTitle/PageTitle";




const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  buttonClass: {
    float: "right",
  },
}))

 const Organization = () => {
    const [open, setOpen] = React.useState(false);
    const [organizations, getOrganizations] = useState([]);

    useEffect(() => {
      const fetchData = async () => { 
          let data = await getAllOrganization();
          getOrganizations(data);
          console.log("GetOrganization " +data[0]);
      }
      fetchData();
}, []);
  
const organizationData = 
      organizations.map(organization => (
        [ 
          organization.organaizationName, 
          organization.phone, 
          organization.billingAddress, 
          organization.billingCity,
          organization.billingState,
          organization.billingCountry
        ]
  ));


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      <PageTitle title="Organization" />
      <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.buttonClass}>
        New Organization
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Organization</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Organization List"
            data={organizationData}
            columns={["Organiation Name", "Phone", "Billing Street", "Billing City","Billing State","Billing Country"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default Organization;
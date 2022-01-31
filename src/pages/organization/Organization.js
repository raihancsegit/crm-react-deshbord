import  { useEffect, useState } from "react";
import { getAllOrganization } from '../../service/api';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';



// components
import PageTitle from "../../components/PageTitle/PageTitle";
import AddOrganization from "./AddOrganization";
import ActionButton from "./ActionButton";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  buttonClass: {
    float: "right",
  },
}))

 const Organization = () => {
    
    const [organizations, getOrganizations] = useState([]);
    useEffect(() => {
      const fetchData = async () => { 
          let data = await getAllOrganization();
          getOrganizations(data);
      }
      fetchData();
}, []);

  
  
  const classes = useStyles();

  const organizationData = 
      organizations.map(organization => (
        [ 
          organization.organaizationName, 
          organization.phone, 
          organization.billingAddress,   
          organization.billingCity,
          organization.billingState,
          organization.billingCountry,
          <ActionButton getTheId={organization._id}/>
        ]
  ));


  
  return (
    <>
      <PageTitle title="Organization" />
      
      <AddOrganization />
           
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Organization List"
            data={organizationData}
            columns={[
              "Organiation Name", 
              "Phone", 
              "Billing Street",
               "Billing City",
               "Billing State",
               "Billing Country",
               "Action",
              ]}
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
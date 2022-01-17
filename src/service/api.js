import axios from 'axios';
const url = 'http://localhost:5000';

export const getAllOrganization = async () => {
    try {
        let response = await axios.get(`${url}/all_organization`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getAllOrganization API ', error)
    }
}
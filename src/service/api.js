import axios from 'axios';
const url = 'http://localhost:5000';

export const createOrganization = async (post) => {
    try {
        return await axios.post(`${url}/create_organization`, post);
    } catch (error) {
        console.log('Error while calling createPost API ', error);
    }
}

export const getAllOrganization = async () => {
    try {
        let response = await axios.get(`${url}/all_organization`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getAllOrganization API ', error)
    }
}

export const deleteOrganization = async (id) => {
    try {
        return await axios.get(`${url}/delete_organization/${id}`);
    } catch(error) {
        console.log('Error while calling deletePost API ', error)
    }
}
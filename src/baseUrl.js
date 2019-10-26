import axios from 'axios';

const url = axios.create({
    baseURL: 'http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000/api'
});

export default url;
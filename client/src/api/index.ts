import axios from 'axios';

const host = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/' });

const getImage = (params: string) => host.get(`/image?id=${params}`);
const postImage = (params: string, img: string) => host.post(`/image?id=${params}`, { img });

export { getImage, postImage };

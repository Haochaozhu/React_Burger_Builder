import axios from 'axios';

const axoisInstance = axios.create({
    baseURL : 'https://react-burger-builder-f320c.firebaseio.com/'
})

export default axoisInstance;
import axios from 'axios';

const ENDPOINT_API_BASE_URL = 'http://localhost:8080/kry';

class EndpointService {

    getEndpoints(){
        return axios.get(ENDPOINT_API_BASE_URL+'/'+'getall');
    }

    addEndpoint(endpoint){
        return axios.post(ENDPOINT_API_BASE_URL+'/'+'add', endpoint);
    }

    getEndpointByName(endpointName){
        return axios.get(ENDPOINT_API_BASE_URL + '/'+'getname' , {
            params: 
            {"name":endpointName}
        });
    }

    updateEndpoint(endpoint, endpointNmae){
        return axios.put(ENDPOINT_API_BASE_URL + '/' + 'update', endpoint);
    }

    deleteEndpoint(endpointName){
        return axios.delete(ENDPOINT_API_BASE_URL + '/'+'delete' ,{
            params: 
            {"name":endpointName}
        });
    }
}

export default new EndpointService()
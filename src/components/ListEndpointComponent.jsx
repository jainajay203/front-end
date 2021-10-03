import React, { Component } from 'react'
import EndpointService from '../services/EndpointService'

class ListEndpointComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                endpoints: []
        }
        this.addEndpoint = this.addEndpoint.bind(this);
        this.editEndpoint = this.editEndpoint.bind(this);
        this.deleteEndpoint = this.deleteEndpoint.bind(this);
    }

    deleteEndpoint(name){
        EndpointService.deleteEndpoint(name).then( res => {
            this.setState({endpoints: this.state.endpoints.filter(endpoint => endpoint.name !== name)});
        });
    }
    viewEndpoint(name){
        this.props.history.push(`/view-endpoint/${name}`);
    }
    editEndpoint(name){
        this.props.history.push(`/edit-endpoint/${name}`);
    }

    componentDidMount(){
        EndpointService.getEndpoints().then((res) => {
            console.log("end   "+JSON.stringify(res.data) );
            this.setState({ endpoints: res.data});
        });
    }

    addEndpoint(){
        this.props.history.push('/add-endpoint/_add');
    }
    refresh(){
        EndpointService.getEndpoints().then((res) => {
            console.log("end   "+JSON.stringify(res.data) );
            this.setState({ endpoints: res.data});
        });
    }
    render() {
        return (
            <div>
                 <h2 className="text-center">Endpoint List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEndpoint}> Add Endpoint</button>
                    <button className="btn btn-danger" onClick={this.refresh.bind(this)} style={{marginLeft: "10px"}}>Refresh</button>  
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> URL</th>
                                    <th> Status</th>
                                    <th> Created Time</th>
                                    <th> Last Modify Time </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.endpoints.map(
                                        endpoint => 
                                        <tr key = {endpoint.name}>
                                             <td> {endpoint.name} </td>   
                                             <td> {endpoint.url}</td>
                                             <td> {endpoint.status  }</td>
                                             <td> {endpoint.createdAt}</td>
                                             <td> {endpoint.updatedAt}</td>
                                             <td>
                                                 <button onClick={ () => this.editEndpoint(endpoint.name)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEndpoint(endpoint.name)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEndpoint(endpoint.name)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEndpointComponent

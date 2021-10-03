import React, { Component } from 'react'
import EndpointService from '../services/EndpointService'

class ViewEndpointComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            endpoint: {}
        }
    }

    componentDidMount(){
        EndpointService.getEndpointByName(this.state.id).then( res => {
            this.setState({endpoint: res.data});
        })
    }
    cancel(){
        this.props.history.push('/endpoints');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Endpoint Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Endpoint Name : </label>
                            <div> { this.state.endpoint.name }</div>
                        </div>
                        <div className = "row">
                            <label> URL : </label>
                            <div> { this.state.endpoint.url }</div>
                        </div>
                        <div className = "row">
                            <label> Status : </label>
                            <div> { this.state.endpoint.status }</div>
                        </div>
                    </div>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Back</button>   
                </div>
                
            </div>
        )
    }
}

export default ViewEndpointComponent

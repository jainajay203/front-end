import React, { Component } from 'react'
import EndpointService from '../services/EndpointService';

class UpdateEndpointComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            url: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeURLHandler = this.changeURLHandler.bind(this);
    }

    componentDidMount(){
        EndpointService.getEndpointByName(this.state.id).then( (res) =>{
            let endpoint = res.data;
            this.setState({name: endpoint.name,
                url: endpoint.url
            });
        });
    }

    updateEndpoint = (e) => {
        e.preventDefault();
        let endpoint = {name: this.state.name, url: this.state.url};
        console.log('endpoint => ' + JSON.stringify(endpoint));
        console.log('endpoint name => ' + JSON.stringify(this.state.id));
        EndpointService.updateEndpoint(endpoint, this.state.id).then( res => {
            if(res.data=="OK"){
                this.props.history.push('/endpoints');
            }else{
                alert(res.data);
            }
            
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeURLHandler= (event) => {
        this.setState({url: event.target.value});
    }

    cancel(){
        this.props.history.push('/endpoints');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Endpoint</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Endpoint Name: </label>
                                            <input placeholder="Endpoint Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> URL: </label>
                                            <input placeholder="Last Name" name="url" className="form-control" 
                                                value={this.state.url} onChange={this.changeURLHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEndpoint}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEndpointComponent

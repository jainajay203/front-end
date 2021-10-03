import React, { Component } from 'react'
import EndpointService from '../services/EndpointService';

class CreateEndpointComponent extends Component {
    constructor(props) {
        console.log("wwew");
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            url: '' 
        }
        this.saveOrUpdateEndpoint = this.saveOrUpdateEndpoint.bind(this);
    }

    // step 3
    componentDidMount(){
console.log(this.state.id);
        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EndpointService.getEndpointByName(this.state.id).then( (res) =>{
                let endpoint = res.data;
                this.setState({name: endpoint.name,
                    url: endpoint.url
                }); 
            });
        }        
    }
    saveOrUpdateEndpoint = (e) => {
        e.preventDefault();
        let endpoint = {name: this.state.name, url: this.state.url};
        console.log('endpoints => ' + JSON.stringify(endpoint));

        // step 5
        if(this.state.id === '_add'){
            EndpointService.addEndpoint(endpoint).then(res =>{
                if(res.data=="OK"){
                    this.props.history.push('/endpoints');
                }else{
                    alert("Invalid Request, Please try again.");
                }
                
            });
        }else{
            EndpointService.updateEndpoint(endpoint , this.state.id).then( res => {
                this.props.history.push('/endpoints');
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({url: event.target.value});
    }


    cancel(){
        this.props.history.push('/endpoints');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Endpoint</h3>
        }else{
            return <h3 className="text-center">Update Endpoint</h3>
        }
    }
    render() {
        console.log("asaass");
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Endpoint Name: </label>
                                            <input placeholder="Endpoint Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> URL: </label>
                                            <input placeholder="Endpoint URL" name="url" className="form-control" 
                                                value={this.state.url} onChange={this.changeLastNameHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEndpoint}>Save</button>
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

export default CreateEndpointComponent

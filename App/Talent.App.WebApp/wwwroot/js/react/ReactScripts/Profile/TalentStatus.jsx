import React from 'react'
import { Form, Checkbox, Radio } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';


export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        const status = props.status ? Object.assign({}, props.status) : {
            status: "",
            availableDate: null
        }
        
        this.state = {
          newstatus:status
            }
               
            
           
        
        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange(event) {
      
        const data = Object.assign({}, this.state.newstatus)
        data[event.target.name] = event.target.value
        console.log(data)
        this.setState({
          
            newstatus: data
         
        }, this.saveProfileData)
}
    componentWillReceiveProps(nextProps) {
        //this is called to before render method
        console.log(nextProps.status)
        this.setState({
                newstatus: nextProps.status
            
            
        })
    }
    
    saveProfileData() {

        console.log(this.state.newstatus)
        const data = Object.assign({}, this.state.newstatus)

        this.props.updateProfileData({ jobSeekingStatus: data });
        this.props.saveProfileData({ jobSeekingStatus: data});

        
    }
    
    render() {
       
        return (
            
            <div className='ui sixteen wide column'>
                <h5>Current Status</h5>
                <Form>
                   
                    <Form.Field>
                         <input type="radio"
                            
                           
                            name='status'
                            value="Actively looking for job"
                            checked={(this.state.newstatus.status === 'Actively looking for job')}
                            onChange={this.handleChange}
                        /> Actively looking for a job
                       
                    </Form.Field>
                    <Form.Field>
                       <span> <input type="radio"
                            
                           
                            name='status'
                            value="Not looking for a job at the moment"
                            checked={(this.state.newstatus.status === 'Not looking for a job at the moment')}
                            onChange={this.handleChange}
                        />    <label>Not looking for a job at the moment</label></span>
                       
                    </Form.Field>
                    <Form.Field>
                        <span><input type="radio"
                           
                            name='status'
                            value="Currently employed but open to offers"
                            checked={this.state.newstatus.status === 'Currently employed but open to offers'}
                            onChange={this.handleChange}
                        />      <label>Currently employed but open to offers</label></span>
                    </Form.Field>
                    <Form.Field>
                        <span><input type="radio"
                           
                            name='status'
                            value="Will be available on later date"
                            checked={this.state.value === 'Will be available on later date'}
                            onChange={this.handleChange}
                        />     <label>Will be available on later date</label></span>
                    </Form.Field>
                  
                </Form>
            </div>
            )
        
    }
}
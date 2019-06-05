import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Form, TextArea, Input } from 'semantic-ui-react'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        //const summary = props.summary ?
        //    Object.assign({}, props.summary)
        //    : {
        //        summary: ""
        //    };

        //const description = props.description ?
        //    Object.assign({}, props.description)
        //    : {
        //        description: ""
        //    };


        this.state = {
            newintro: {
                summary: "" ,
                description: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveContact = this.saveContact.bind(this);
       
    };

    handleChange(event) {

        const data = Object.assign({}, this.state.newintro)
        data[event.target.name] = event.target.value
        this.setState({
            newintro: data
        })
    }
    componentWillReceiveProps(nextProps) {
        //this is called to before render method
        console.log(nextProps.summary)
        console.log(nextProps.description)
        this.setState({
            newintro: {
                summary: nextProps.summary,
                description: nextProps.description
            }
        })
    }

    saveContact() {
        const data = Object.assign({}, this.state.newintro)

        this.props.updateProfileData(data)
        this.props.updateWithoutSave(data)

      
    }
  


    render() {

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Form>
                            <Form.Field>
                                <Form.Input  name="summary" value={this.state.newintro.summary}
                                    label="Summary must be no more than 150 characters."
                                    placeholder="Please provide a short summary about yourself"
                                    onChange={this.handleChange}

                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea rows={5} name="description" value={this.state.newintro.description}
                                    label="Description must be between 150-600 characters."
                                    placeholder='Please tell us about any hobbies, additional expertise or anything else you would like to add.'
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </React.Fragment>
                    <br />
                    <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                </div>
            </div>
        )
    }
}




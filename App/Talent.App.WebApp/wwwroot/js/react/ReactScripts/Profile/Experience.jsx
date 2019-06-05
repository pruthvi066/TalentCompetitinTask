/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Button, Form, Input } from 'semantic-ui-react';
import moment from 'moment'

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            exp: [],
            experience: [],
            showAddSection: false,
            showEditSection: false,
            showDeleteSection: false,
            updateData: {
                id: " ",
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            },

            data: {
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            }




        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        //this.addLanguage = this.addLanguage.bind(this)
        this.handleAddSection = this.handleAddSection.bind(this)
        this.handleEditSection = this.handleEditSection.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData = this.loadData.bind(this)
        this.addExperience = this.addExperience.bind(this);
        this.addExperiences = this.addExperiences.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this);
        this.deleteExperiences = this.deleteExperiences.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
        this.updateExperiences = this.updateExperiences.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log(res.data)
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
        // this.init()
    }
    updateWithoutSave(newValues) {
        console.log(newValues)
        let newexp = Object.assign([], this.state.experience, newValues)
        this.setState({
            experience: newexp
        })
        console.log(this.state.experience)

    }
    openEdit() {
        this.setState({ showEditSection: true })
    }
    closeEdit() {
        this.setState({
            showAddSection: false,
            showEditSection: false,
            updateData: {
                id: " ",
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            },

            data: {
               
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            }
        })

        // this.loadData();
    }
    handleChange(event) {
       
        if (this.state.updateData.id !== " ") {
          
            const updateData = Object.assign({}, this.state.updateData)
            updateData[event.target.name] = event.target.value
            this.setState({ updateData }, () => console.log(this.state))

        }
        else {
            const data = Object.assign({}, this.state.data)
            data[event.target.name] = event.target.value
            this.setState({ data }, () => console.log(this.state))

        }
    }
    addExperience() {

        this.setState({
            exp: this.state.data
        }, this.addExperiences)

        this.closeEdit()
    }
    debugger
    addExperiences() {

        console.log(JSON.stringify(this.state.experience))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.exp),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.closeEdit()
    }
    updateExperience() {

        this.setState({
            exp: this.state.updateData
        }, this.updateExperiences)
    }


    updateExperiences() {

        console.log(JSON.stringify(this.state.exp))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.exp),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.closeEdit()
    }

    deleteExperience(exp) {

        this.setState({

            exp: exp,
            experience: []
        }, this.deleteExperiences)
    }

    deleteExperiences() {

        console.log(JSON.stringify(this.state.exp))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.exp),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.closeEdit()
    }

    handleEditSection(exp) {
        console.log(exp)
        this.setState({
            showEditSection: true,
            updateData: {
                id: exp.id,
                company: exp.company,
                position: exp.position,
                responsibilities: exp.responsibilities,
                start: exp.start,
                end: exp.end
            }
        })

    }
    handleAddSection(event) {
        this.setState({
            showAddSection: true,
            updateData: { id: " " }

        })

    }

    render() {

        const {experience} = this.state;
        return (
            <div className='ui sixteen wide column'>
                {this.state.showAddSection ?

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="Company"
                                placeholder='Company'
                                name="company"
                                onChange={this.handleChange}
                                value={this.state.data.company}
                            />
                            <Form.Input
                                label="Position"
                                placeholder='Position'
                                name="position"
                                onChange={this.handleChange}
                                value={this.state.data.position}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>


                            <Form.Input
                                type="date"
                                label="Start Date"
                                placeholder='Start Date'
                                name="start"
                                onChange={this.handleChange}
                                value={this.state.data.start}
                            />
                            <Form.Input
                                label="End Date"
                                type="date"
                                placeholder='End Date'
                                name="end"
                                onChange={this.handleChange}
                                value={this.state.data.end}
                            />

                        </Form.Group>
                      
                            <Form.Input
                                label="Responsibilities"
                                placeholder='Responsibilities'
                                name="responsibilities"
                                onChange={this.handleChange}
                                value={this.state.data.responsibilities}
                       />


                        <button type="button" className="ui teal button" onClick={this.addExperience} > Add</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancle</button>


                    </Form>

                    : null}
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Company</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                           <Table.HeaderCell>Start</Table.HeaderCell>
                            <Table.HeaderCell>End</Table.HeaderCell>
                            <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                            <Table.HeaderCell>
                                <button type="button" className="ui right floated teal button" color="black" onClick={this.handleAddSection}><i class="plus icon" />Add New</button>

                            </Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        
                        {experience.map(exp => (
                           
                            <Table.Row key={exp.id} >

                               
                                {(this.state.showEditSection && (exp.id == this.state.updateData.id)) ?

                                    <Table.Cell colSpan="6">
                                        
                                    <Form>
                                        <Form.Group widths='equal'>
                                        <Form.Input
                                             label="Company"
                                            placeholder='Company'
                                            name="company"
                                            value={this.state.updateData.company}
                                                       
                                            onChange={this.handleChange}
                                            
                                                />


                                     
                                            <Form.Input
                                    label="Company"
                                            placeholder='Position'
                                                        name="position"
                                                        value={this.state.updateData.position}
                                            onChange={this.handleChange}
                                            
                                            />
                                        </Form.Group>

                                            <Form.Group widths='equal'>
                                                <div className="field">
                                                    <label> Start Date:</label>
                               
                                 
                                        <input type="date"
                                            placeholder='Start Date'
                                                    name="start"
                                                    value={this.state.updateData.start}
                                            onChange={this.handleChange}
                                            
                                                    />
                                                </div>



                                                <div className="field">
                                                    <label> Start Date:</label>

                                  
                                   
                                        <input type="date"
                                            placeholder='End Date'
                                                    name="end"
                                                    value={this.state.updateData.end}
                                            onChange={this.handleChange}
                                           
                                                    />
                                                </div>
                                        </Form.Group>
                                           


                                               
                          
                                                                          
                                                                         
                                                <Form.Input label=" Responsibilities:"
                                            placeholder='Responsibilities'
                                                name="responsibilities"
                                                value={this.state.updateData.responsibilities}
                                            onChange={this.handleChange}
                                           
                                        />
                                  

                                        </Form>

                              

                                
                             
                                        <button type="button" className="ui teal button" onClick={this.updateExperience} > Update</button>
                                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancle</button>
                                    </Table.Cell>
 
                                    :
                                 <React.Fragment>
                                    <Table.Cell>{exp.company}</Table.Cell>
                                    <Table.Cell>{exp.position}</Table.Cell>
                                    <Table.Cell>{exp.responsibilities}</Table.Cell>
                                    <Table.Cell>{moment(exp.start).format("Do MMM YYYY")}</Table.Cell>
                                    <Table.Cell>{moment(exp.end).format("Do MMM YYYY")}</Table.Cell>

                                    <Table.Cell>
                                        <i class="pencil icon"  onClick={() => this.handleEditSection(exp)}></i>
                                  
                                        
                                            <i class="icon delete" onClick={() => this.deleteExperience(exp)}></i>
                                       
                                    </Table.Cell>
                                </React.Fragment>
                                    }

                                </Table.Row>
                            
                        ))}
                    </Table.Body>

                </Table>
            </div>
        )
    }
}
        
               


    

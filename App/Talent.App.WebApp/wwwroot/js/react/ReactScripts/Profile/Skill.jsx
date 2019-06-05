/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Button, Form, Icon } from 'semantic-ui-react';
//import { levels } from '../../../../ js / react /ReactScripts/Employer/common.js';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);




        this.state = {

            skills: [],
            skill: [],
            showAddSection: false,
            showEditSection: false,
            showDeleteSection: false,
            updateData: {
                id: " ",
                name: "",
                level: ""
            },

            data: {
                name: "",
                level: ""
            }




        }


        this.handleAddSection = this.handleAddSection.bind(this)
        this.handleEditSection = this.handleEditSection.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveProfileData = this.saveProfileData.bind(this)
        this.updateProfileData = this.updateProfileData.bind(this)
        this.deleteProfileData = this.deleteProfileData.bind(this)
        this.loadData = this.loadData.bind(this)
        // this.init = this.init.bind(this);
        this.addskills = this.addskills.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateskill = this.updateskill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)


    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getSkill',
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
        let newskill = Object.assign([], this.state.skills, newValues)
        this.setState({
            skills: newskill
        })
        
    }


    closeEdit() {
        this.setState({
            showAddSection: false,
            showEditSection: false,
            data: {
                name: "",
                level: ""
            },
            updateData: {
                id: "",
                name: "",
                level: ""
            }
        })

        // this.loadData();
    }



    saveProfileData() {

        //const langData = [...this.state.languages, this.state.data]
        console.log(this.state.data)
        console.log(this.state.skills)
        //  let newLang = Object.assign({}, langData) 
        //   console.log(newLang)
        this.setState({
            skill: this.state.data
        }, this.addskills)

        this.closeEdit()
    }
    addskills() {

        console.log(JSON.stringify(this.state.skill))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
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

    updateskill() {

        console.log(JSON.stringify(this.state.skill))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
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
    deleteSkill() {

        console.log(JSON.stringify(this.state.skill))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
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

    handleChange(event) {
        console.log(this.state.updateData.id + "UpdateId")
        if (this.state.updateData.id !== " ") {
            console.log("id has value")
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
    updateProfileData() {
        console.log(this.state.skill)
        this.setState({
            skill: this.state.updateData
        }, this.updateskill)
    }
    deleteProfileData(skill) {
        console.log(skill)
        this.setState({
            skill: skill,
            skills: []
        }, this.deleteSkill)
    }

    handleEditSection(skill) {
        console.log(skill)
        this.setState({
            showEditSection: true,
            updateData: {
                id: skill.id,
                name: skill.name,
                level: skill.level
            }
        })

    }


    handleAddSection(event) {
        this.setState({
            showAddSection: true,
            updateData: { id: " " }
            //newLanguage: {
            //    languages: this.props.languageData
            //}
        })

    }
    render() {
        const { skills } = this.state;
        //const { languageData } = this.props;
        console.log(skills)
        const obj = (
            < div className='ui sixteen wide column' >
                <div >

                    {this.state.showAddSection ?
                        <Form>
                            <Form.Group>
                                <input type="text"
                                    placeholder='Skill'
                                    name="name"
                                    value={this.state.data.name}
                                    onChange={this.handleChange}
                                />

                                <select className="ui right labeled dropdown"
                                    placeholder="Skill Level"
                                    value={this.state.data.level}
                                    onChange={this.handleChange}
                                    name="level"
                                >
                                    <option value="">Skill Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                    
                                </select>

                                <button type="button" className="ui teal button" onClick={this.saveProfileData} > Add</button>
                                <button type="button" className="ui button" onClick={this.closeEdit}>Cancle</button>
                            </Form.Group>
                        </Form>

                        : null
                    }


                    <Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Skill</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui right floated teal button" color="black" onClick={this.handleAddSection}><i class="plus icon" />Add New</button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>



                        <Table.Body>

                            {skills.map(skill => (
                                <Table.Row key={skill.id} >

                                    {(this.state.showEditSection && (skill.id == this.state.updateData.id)) ?


                                        <Table.Cell>
                                            <input type="text"
                                                placeholder='Skill'
                                                name="name"
                                                value={this.state.updateData.name}
                                                onChange={this.handleChange}
                                                
                                            />

                                        </Table.Cell>

                                        : <Table.Cell>{skill.name}</Table.Cell>
                                    }





                                    {(this.state.showEditSection && (skill.id == this.state.updateData.id)) ?
                                        <Table.Cell>
                                            <select className="ui right labeled dropdown"
                                                placeholder="Skill Level"
                                                name="level"
                                                value={this.state.updateData.level}
                                                onChange={this.handleChange}
                                                
                                            >
                                                <option value="">Skill Level</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Expert">Expert</option>         
                                            </select>
                                        </Table.Cell>
                                        : <Table.Cell>{skill.level}</Table.Cell>}


                                    {(this.state.showEditSection && (skill.id == this.state.updateData.id)) ?
                                        <React.Fragment>
                                            <Table.Cell>     <button type="button" className="ui teal button" onClick={this.updateProfileData} > Update</button>
                                                <button type="button" className="ui button" onClick={this.closeEdit}>Cancle</button></Table.Cell>

                                        </React.Fragment>
                                        :

                                        <Table.Cell><button type="button" className="ui right floated button" onClick={() => this.handleEditSection(skill)}>
                                            <i class="icon pencil"></i>
                                        </button>
                                            <button type="button" className="ui right floated button" onClick={() => this.deleteProfileData(skill)}>
                                                <i class="icon delete"></i>
                                            </button>
                                        </Table.Cell>
                                    }

                                </Table.Row>
                            )






                            )}


                        </Table.Body>
                    </Table>
                </div>
            </ div>
        )


        return obj;





    }
}
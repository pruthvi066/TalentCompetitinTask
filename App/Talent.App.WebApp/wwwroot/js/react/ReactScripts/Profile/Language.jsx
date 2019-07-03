/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Button, Form, Icon } from 'semantic-ui-react';
//import { levels } from '../../../../ js / react /ReactScripts/Employer/common.js';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        
        
     
        this.state = {
            
            languages: [],
            language: [],
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
        this.addLanguages = this.addLanguages.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
       

    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getLanguage',
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
        let newLang = Object.assign([], this.state.languages, newValues)
        this.setState({
            languages: newLang
        })
        console.log(this.state.languages)

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
    console.log(this.state.languages)
    //  let newLang = Object.assign({}, langData) 
    //   console.log(newLang)
    this.setState({
        language: this.state.data
    }, this.addLanguages)

    this.closeEdit()
}
addLanguages() {

    console.log(JSON.stringify(this.state.languages))
    var cookies = Cookies.get('talentAuthToken');
    $.ajax({
        url: 'http://localhost:60290/profile/profile/addLanguage',
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(this.state.language),
        success: function (res) {
            console.log(res, res.success + "successmess")
            if (res.success == true) {
                TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
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

updateLanguage() {

    console.log(JSON.stringify(this.state.language))
    var cookies = Cookies.get('talentAuthToken');
    $.ajax({
        url: 'http://localhost:60290/profile/profile/updateLanguage',
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(this.state.language),
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
deleteLanguage() {

    console.log(JSON.stringify(this.state.language))
    var cookies = Cookies.get('talentAuthToken');
    $.ajax({
        url: 'http://localhost:60290/profile/profile/deleteLanguage',
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(this.state.language),
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
    console.log(this.state.language)
    this.setState({
        language: this.state.updateData
    }, this.updateLanguage)
}
deleteProfileData(lang) {
    console.log(lang)
    this.setState({
        language: lang,
        languages: []
    }, this.deleteLanguage)
}

handleEditSection(lang) {
    console.log(lang)
    this.setState({
        showEditSection: true,
        updateData: {
            id: lang.id,
            name: lang.name,
            level: lang.level
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
    const { languages } = this.state;
    //const { languageData } = this.props;
    console.log(languages)
    const obj = (
        < div className='ui sixteen wide column' >
            <div >
               
                {this.state.showAddSection ?
                    <Form>
                        <Form.Group>
                            <input type="text"
                                placeholder='language'
                                name="name"
                                value={this.state.data.name}
                                onChange={this.handleChange}
                            />
                      
                            <select className="ui right labeled dropdown"
                                placeholder="Language Level"
                                value={this.state.data.level}
                                onChange={this.handleChange}
                                name="level"
                            >
                                <option value="">Language Level</option>
                                <option value="Basic">Basic</option>
                                <option value="Conversational">Conversational Level</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Native/Bilingual">Native/Bilingual</option>
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
                       <Table.HeaderCell>Language</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell>
                                <button type="button" className="ui right floated teal button" color="black" onClick={this.handleAddSection}><i class="plus icon" />Add New</button>
                            </Table.HeaderCell>
                   </Table.Row>
               </Table.Header>
                    
                
              
                    <Table.Body>

                    {languages.map(lang => (
                            <Table.Row key={lang.id} >
                               
                            {(this.state.showEditSection && (lang.id == this.state.updateData.id)) ?


                                    <Table.Cell>
                                    <input type="text"
                                        placeholder='language'
                                        name="language"
                                        onChange={this.handleChange}
                                        value={this.state.updateData.name}
                                        />

                                    </Table.Cell>

                                : <Table.Cell>{lang.name}</Table.Cell>
                            }





                                {(this.state.showEditSection && (lang.id == this.state.updateData.id)) ?
                                    <Table.Cell>
                                     <select className="ui right labeled dropdown"
                                        placeholder="Language Level"
                                        value={this.state.updateData.level}
                                        onChange={this.handleChange}
                                        name="level"
                                    >
                                        <option value="">Language Level</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Conversational">Conversational Level</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Native/Bilingual">Native/Bilingual</option>
                                        </select>
                                    </Table.Cell>
                                            : <Table.Cell>{lang.level}</Table.Cell>}
                              
                                
                            {(this.state.showEditSection && (lang.id == this.state.updateData.id)) ?
                                    <React.Fragment>
                                        <Table.Cell>     <button type="button" className="ui teal button" onClick={this.updateProfileData} > Update</button>
                                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancle</button></Table.Cell>
                                                
                                </React.Fragment>
                                :

                                <Table.Cell><button type="button" className="ui right floated button" onClick={() => this.handleEditSection(lang)}>
                                    <i class="icon pencil"></i>
                                </button>
                                    <button type="button" className="ui right floated button" onClick={() => this.deleteProfileData(lang)}>
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
import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Card, Grid, Image, Embed, Label } from 'semantic-ui-react'
import Cookies from 'js-cookie'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: [],
            showEditSection: false
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.loadData = this.loadData.bind(this)
    };

    componentDidMount() {
        this.loadData();
    }
    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalent',
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
    }
    updateWithoutSave(newValues) {


        let newProfile = Object.assign([], this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        })

    }
    openEdit() {

        this.setState({
            showEditSection: true,

        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false,

        })

    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        let skills = ["C#", ".Net Core", "Javascript", "ReactJS", "PreactJS"];
        let string = this.state.profileData.currentEmployment;
        const data = this.state.profileData;
        const profileData = this.state.profileData;

        return (
            <div>

                <Card.Group >
                    {profileData.map(talent => (



                        <Card >
                            <Card.Content>
                                <Card.Header>{talent.name}
                                    <Icon name="star" size='large' className="ui right floated" />




                                </Card.Header>

                            </Card.Content>

                            <Card.Description>

                                <Grid columns={2}>

                                    <Grid.Column>
                                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={true} rounded />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card.Content>
                                            <Card.Header>Talent Snapshot</Card.Header><br />
                                            <Card.Header>CURRENT EMPLOYER</Card.Header>
                                            <Card.Meta>{talent.currentEmployment}</Card.Meta>
                                            <Card.Header>VISA STATUS</Card.Header>
                                            <Card.Meta>{talent.visa}</Card.Meta>
                                            <Card.Header>POSITION</Card.Header>
                                            <Card.Meta>{talent.level}</Card.Meta>
                                        </Card.Content>
                                    </Grid.Column>
                                </Grid>
                            </Card.Description>



                            <Card.Content extra>
                                <Grid divided='vertically'>
                                    <Grid.Row columns={4}>
                                        <Grid.Column>
                                            <Icon name="video icon" onClick={this.closeEdit} size='large' />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Icon name="file pdf outline" size='large' />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Icon name="linkedin" size='large' />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Icon name="github" size='large' />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>




                            </Card.Content>

                            <Card.Content>
                                <Label basic color='blue'>{skills[0]}</Label>
                            </Card.Content>
                        </Card>))}
                </Card.Group>
            </div>


        )
    }

    renderDisplay() {

        let skills = ["C#", ".Net Core", "Javascript", "ReactJS", "PreactJS"];
        const { profileData } = this.state;
        return (
            <div>
               
            <Card>


              

                    <Card.Content>
                        <Card.Header>{profileData.name}

                            <Icon name="star" size='large' className="ui right floated" />


                        </Card.Header>

                        <Card.Description>

                            <Embed id='lE6RYpe9IT0' source='youtube' />

                        </Card.Description>

                    </Card.Content>
                    <Card.Content extra>
                        <Grid divided='vertically'>
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <Icon name="user" onClick={this.openEdit} size='large' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Icon name="file pdf outline" size='large' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Icon name="linkedin" size='large' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Icon name="github" size='large' />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>




                    </Card.Content>
                    <Card.Content>
                        <Label basic color='blue'>{skills[0]}</Label>
                    </Card.Content>
                  

                    </Card>
              
            </div>)



    }
}

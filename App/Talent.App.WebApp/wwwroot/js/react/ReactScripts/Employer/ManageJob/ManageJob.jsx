import React from 'react';
import { Component } from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, Button, Label } from 'semantic-ui-react';



export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.close = this.close.bind(this);
        this.edit = this.edit.bind(this);
        this.copy = this.copy.bind(this);
        //your functions go here
    };

    init() {
        //let loaderData = this.state.loaderData;
       
        this.loadData(()=>
            this.setState({ loaderData })
        )//comment this
        loaderData.isLoading = false;
        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
       
    };

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');

        
       // your ajax call and other logic goes here

        $.ajax({
            data:{
                activePage: this.state.activePage,
                sortbyDate: this.state.sortBy.date,
                showActive: this.state.filter.showActive,
                showClosed: this.state.filter.showClosed,
                showDraft: this.state.filter.showDraft,
                showExpired: this.state.filter.showExpired,
                showUnexpired: this.state.filter.showUnexpired

            },
            url: link,
            type: "GET",
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },


            success: function (res) {
                if (res.myJobs) {
                    this.state.loadJobs = res.myJobs
                }
                console.log("result Jobs", this.state.loadJobs);
                callback();
            }.bind(this),
            error: function (res) {
                console.log(res.status);
                callback();
            }
        })
    }
         
        
    

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading =false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    close() {
        this.setState({ open: false });

    }
    edit() {
        this.setState({ edit: true });
    }
    copy() {
        this.setState(alert("data copied successfully"));
        windoe.reload.location();
    }
    render() {

        let datalist = this.state.loadJobs;
        let list = null;
        if (datalist != "") {
            list = datalist.map(card =>
                <span>
                    <div>
                        <Card.Group className="grid">
                  
                        <Card key={card.id}>
                        <Card.Content>
                                <Card.Header>{card.title}</Card.Header><br/>
                                <Label color="black" ribbon="right"><i className="user icon"></i>0</Label>
                            <Card.Meta>
                                <span className="date">{card.location.city},{card.location.country}</span>
                            </Card.Meta>
                            <Card.Description><b>{card.summary}</b></Card.Description>
                        </Card.Content>
                          
                            <Card.Content extra>
                            <span className="left floated">
                                {
                                    <label className="ui label">Expired</label>
                                }
                                </span>

                            <span className="right floated">
                                <Button.Group>
                                    <Button color="blue" className="ui basic group" onClick={this.close}><i class="close icon"></i>Close</Button>
                                    <Button color="blue" className="ui basic group" onclick={this.edit}><i class="edit icon" ></i>Edit</Button>
                                    <Button color="blue" className="ui basic group" onClick={this.copy}><i class="copy icon" ></i>Copy</Button>
                                    </Button.Group>
                              </span>  
                           
                        </Card.Content>
                      
                        </Card>
                       
                        </Card.Group>
                        </div>
                </span>
             
                  
               
            )
        }
        else {
            list="jobs Not Found"
        }

        const filterOptions = [
        {
                key: 'Choose Filter',
                text: 'Choose Filter',
                value: 'Choose Filter',
            
        },
        
        {
            key: 'showActive',
                text: 'showActive',
                    value: 'showActive',
            
        },
        
        {
            key: 'showClosed',
                text: 'showClosed',
                value: 'showClosed',
            
        },
        
        {
            key: 'showDraft',
            text: 'showDraft',
            value: 'showDraft',
            
        },
        
        {
            key: 'showExpired',
                text: 'showExpired',
            value: 'showExpired',
            
        },
        
        {
            key: 'showUnExpired',
            text: 'showUnExpired',
            value: 'howUnExpired',
            
        },
        ]
        const SortbyOptions = [
            {
                key: 'Newest First',
                text: 'Newest First',
                value: 'Newest First',

            },
        ]
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h1>List of Jobs</h1>

                    <div>
                        <span>
                        <i class="filter icon"></i>
                        Filter:
    
                         <Dropdown  inline options={filterOptions}
                                defaultValue={filterOptions[0].value} />

                            <i class="calendar alternate icon"></i>
                            Sort by Date:

                             <Dropdown inline options={SortbyOptions}
                                defaultValue={SortbyOptions[0].value} />
                            </span>
    <br/>
    
                    </div>
                    <br/>

                    <div className="ui two cards">
                        {list}
                    </div>
                 


                    <div align="center">
                        <Pagination
                          
                            activePage={this.state.activepage}
                            totalPages={1}
                            itemsCountPerPage={2}
                        />
                    </div>
                    </div>
               
            </BodyWrapper>
        )
    }
}
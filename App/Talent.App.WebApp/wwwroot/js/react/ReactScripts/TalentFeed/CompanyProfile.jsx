import React from 'react';
import { Loader } from 'semantic-ui-react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        const details = props.details ? Object.assign({}, props.details) :
            {
                name: "",
                email: "",
                phone: "",
              
            }
    }

    render() {
        let Name = this.props.details ? this.props.details.name : ""
        let Phone = this.props.details ? this.props.details.phone : ""
        let Email = this.props.details ? this.props.details.email : ""
        let City = this.props.details ? this.props.details.location.city : ""
        let Country = this.props.details ? this.props.details.location.country : ""

        console.log(this.props.details)
        return (
           
            <Card >

                <Card.Content className="center aligned">
                    <div className="add-media"> <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='mini' /></div><br />
             
               
                    <Card.Header>{Name}</Card.Header>
                    <Card.Meta><Icon name="map marker" />
                        {City},{Country}
                    </Card.Meta>
                    <Card.Description>
                        <h5>
                        We currently do not have specific skills that we desire
                        </h5>
      </Card.Description>
                </Card.Content>
                <Card.Content extra>

                    <i className="phone icon" />:{Phone}<br/>
                    <i className="mail icon" />:{Email}




                        
     
                </Card.Content>
                </Card>
          
            )
        
    }
}
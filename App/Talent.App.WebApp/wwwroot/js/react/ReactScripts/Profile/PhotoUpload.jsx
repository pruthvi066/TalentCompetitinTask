/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { IconButton, Image } from 'semantic-ui-react';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
      
      
        this.state = {
            
           file:"",
          url:"",
            mode: 'view',
          
            
         
        }

      
        this.upload = this.upload.bind(this)
        this.uploadpic = this.uploadpic.bind(this)
       
    }
    closeEdit() {
        mode:'view'
    }
  
    handleClick(e) {
        this.refs.fileUploader.click();
    }
    onChangeFile(event) {

        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        console.log(file)
        let reader = new FileReader();
        
        this.state = {
            file: file.name,

        };

        reader.onloadend = () => {
            this.setState({
                file: file,
                mode:'edit',
                url: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

       
    

   
    upload(e) {
        e.preventDefault();
       
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            url: nextProps.imageId
        })
    }

  
    uploadpic() {
        var photo = this.props.savePhotoUrl;
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: photo,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.url),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Profile Photo updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile Photo did not update successfully", "error", null, null)
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
    handleSubmit(e) {
        e.preventDefault();
        this.uploadpic()
        this.setState({
            mode:'view'
        })
    }
    render() {
      
        if (this.state.mode === 'view') {
            
            return (
                <div className='ui sixteen wide column'>
                    <div className="add-media" onClick={this.handleClick.bind(this)}>
                       
                            <Image src={this.state.url} width="150px" height="150px" alt="Profile Photo" onClick={this.upload.bind(this)} />
                   
                        <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} onChange={this.onChangeFile.bind(this)} />
                      

                    </div>
                </div>
            )
        }
        else {
          

            return (
                <div className='ui sixteen wide column'>
                    <div className="add-media">
                        <Image  src={this.state.url} width="150px" height="150px" alt="Profile Photo" className="profileImg"/>
                        <br />
                        <button type="button" hidden='true' className="ui teal button" onClick={(e) => this.handleSubmit(e)}>Upload</button>


                    </div>
                </div>
            )

        }

    }
            
        
}

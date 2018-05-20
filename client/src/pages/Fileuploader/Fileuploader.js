import React, { Component } from "react";

class Fileuploader extends Component {

    state = {
        file: null,
        result: null
    };

    uploadFile = (file, signedRequest, url) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    alert(`File has been uploaded to ${url}`);
                } else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }

    getSignedRequest = (file) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        // xhr.open('GET', `/api/sign-s3`);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const response = JSON.parse(xhr.responseText);
                    this.uploadFile(file, response.signedRequest, response.url);
                } else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }
    
    uploadHandler = event => {
        event.preventDefault();

        if(this.state.file == null){
            return alert("No file selected.");
        }

        this.getSignedRequest(this.state.file);

    };
    
    fileChangeHandler = event => {
        this.setState({file:event.target.files[0]})
    };

    render() {
        return (
            <form>
                <input type="file" onChange={this.fileChangeHandler} />
                <button type="submit" onClick={this.uploadHandler}>Upload</button>
            </form>
        );
    }
}

export default Fileuploader;
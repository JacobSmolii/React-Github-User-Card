import React,{Component,useEffect} from "react";
import axios from 'axios';
import User from "./User";
import "./App.css"
import Followers from "./Followers";
import Styled from 'styled-components'

const tok = 'VladyslavHorbachenko:9c3feed4400b6472305818abde9b4e1d6799f3bd'; const hash = btoa(tok); const Basic = 'Basic ' + hash; var config = {headers: {'Authorization': Basic  }}


const Container = Styled.div `
    width:80%,
    margin:0 auto;
  
`

const Center = Styled.div`
    justify-content: center;
    align-items: center;
     text-align: center;
`
class GitRequest extends Component{
    constructor() {
        super();
        this.state = {
            user: [],
            followers:[],
            name:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }


    handleChange(evt){
        this.setState({name:evt.target.value})
    }
    searchHandler(evt) {
        evt.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.name}`,config)
            .then(response => {
                console.log(response);
                this.setState({user: [response.data]})
            });
        axios.get(`https://api.github.com/users/${this.props.people}/followers`,config)
            .then(resp => {
                console.log(resp);
                this.setState({followers:resp.data})
            })
    }
    render() {
        return (
           <Container>
                <Center>
                <form className="form" onSubmit={this.searchHandler}>
                    <label htmlFor="name"> </label>
                    <input type="text" value={this.state.name} name = "name" onChange={this.handleChange} placeholder="Waiting for login..."/>
                    <button className = "submit">Submit</button>
                </form>
                {this.state.user.map(item => {
                    return <User
                        login = {item.login}
                        avatar = {item.avatar_url}
                        repo = {item.public_repos}
                        followers = {item.followers}
                        following = {item.following}
                    />
                })}
                <div className="list">
                    {this.state.followers.map(item => (
                        <li>{item.login}</li>
                    ))}

                </div>
                </Center>
           </Container>

        );
    }
}
export default GitRequest;




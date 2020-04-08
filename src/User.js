import React,{Component} from "react";
import "./App.css"


class User extends Component{

    render() {
        return (
            <div className="user">
                <img src={this.props.avatar} alt=""/>
                  <h1>login: {this.props.login}</h1>
                <h2>Public repos: {this.props.repo}</h2>
                <h2>Followers: {this.props.followers}</h2>
                <h2>Following: {this.props.following}</h2>
            </div>
        );
    }
}
export default User;
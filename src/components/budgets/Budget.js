import { Component } from "react";

export default class Article extends Component {
  render() {
    return (
      <div>
        <h4>New Budget!</h4>
      </div>
    );
  }

//   deleteArticle = (e) => {
//     e.preventDefault();
//     console.log('Article Id: ', this.props.id)
    
//     // calls parent method passed down as props
//     this.props.deleteArticle(this.props.id)
//   }
}

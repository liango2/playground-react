/** @jsx React.DOM */

var Comment = React.createClass({
    render: function () { return (
        <blockquote className="comment">
            <div className="text">{this.props.children}</div>
            <cite className="author"> - {this.props.author}</cite>
        </blockquote>
    ); }
});

var CommentList = React.createClass({
    render: function () {
        var comments = this.props.data.map(function (comment) {
            return (<Comment author={comment.author}>{comment.text}</Comment>)
        })
        return (<div className="commentList">{comments}</div>); }
});

var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text) return;
        this.props.onCommentSubmit({text: text, author: "blah"});
        this.refs.text.getDOMNode().value = "";
    },
    render: function () { return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
        <textarea ref="text" className="field" rows="6"></textarea>
        <button className="button">submit</button>
        </form>
    ); }
});

var CommentBox = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.setState({data: data});
    },
    handleCommentSubmit: function (comment) {
        console.log("here", comment);
        this.state.data.push({author: comment.author, text: comment.text});
        this.setState(this.state);
    },
    render: function () {
        return (
            <div className="commentBox">
            <CommentList data={this.state.data}/>
            <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

React.renderComponent(<CommentBox/>, document.querySelector("#content"));

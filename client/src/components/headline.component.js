import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import HeadlineDataService from "../services/headline.service";

export default class Headline extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.getHeadline = this.getHeadline.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateHeadline = this.updateHeadline.bind(this);
        this.deleteHeadline = this.deleteHeadline.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.state = {
            currentHeadline: {
                id: null,
                title: "",
                published: false,
                clickbait: "Not yet evaluated.",
                sentiment: -1
            },
            message: "",
            redirect: false
        };
    }

    componentDidMount() {
        this.getHeadline(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentHeadline: {
                    ...prevState.currentHeadline,
                    title: title
                }
            };
        });
    }


    getHeadline(id) {
        console.log("gettingheadline....")
        console.log(id);
        HeadlineDataService.get(id)
            .then(response => {
                this.setState({
                    currentHeadline: response.data
                });
                console.log(response.data);
            })

            .catch(e => {
                alert(e.response.data.message);
                this.setState({ redirect: true });
                console.log(e.response.data.message);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentHeadline.id,
            title: this.state.currentHeadline.title,
            published: status,
            clickbait: this.state.currentHeadline.clickbait,
            sentiment: this.state.currentHeadline.sentiment
        };

        HeadlineDataService.update(this.state.currentHeadline.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentHeadline: {
                        ...prevState.currentHeadline,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateHeadline() {
        HeadlineDataService.update(
            this.state.currentHeadline.id,
            this.state.currentHeadline
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The headline was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteHeadline() {
        HeadlineDataService.delete(this.state.currentHeadline.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/headlines')
            })
            .catch(e => {
                console.log(e);
            });
    }

    evaluate() {
        const title = this.state.currentHeadline.title;
        console.log(title);
        HeadlineDataService.evaluate(title)
            .then(response => {
                console.log(response.data['clickbait']);
                console.log(response.data['sentiment']);
                this.setState(prevState => ({
                    currentHeadline: {
                        ...prevState.currentHeadline,
                        clickbait: response.data['clickbait'],
                        sentiment: response.data['sentiment']
                    }
                }));
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {

        const { redirect } = this.state;
        if (redirect === true) {
            return <Redirect to="/" />
        }
        const { currentHeadline } = this.state;

        return (
            <div>
                {currentHeadline ? (
                    <div className="edit-form">
                        <h4>News Headline</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentHeadline.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentHeadline.published ? "Published" : "Pending"}
                            </div>
                            <div className="form-group">
                                <label>
                                    <strong>Clickbait:</strong>
                                </label>
                                {currentHeadline.clickbait !== "Not yet evaluated." ? `${(Math.round(currentHeadline.clickbait * 100) / 100).toFixed(2)}%` : currentHeadline.clickbait}
                            </div>
                            {currentHeadline.clickbait > 50 ? <div>Emotion: {currentHeadline.sentiment}%</div> : ""}
                        </form>

                        {currentHeadline.published ? (
                            <button
                                className="badge badge-primary mr-2 orangebtn"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2 greenbtn"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2 redbtn"
                            onClick={this.deleteHeadline}
                        >
                            Delete
                        </button>
                        <button
                            className="badge badge-danger mr-2 redbtn"
                            onClick={this.evaluate}
                        >Evaluate
                        </button>
                        <button
                            type="submit"
                            className="badge badge-success bluebtn"
                            onClick={this.updateHeadline}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a News Headline...</p>
                    </div>
                )}
            </div>
        );
    }
}
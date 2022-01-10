import React, { Component } from "react";
import HeadlineDataService from "../services/headline.service";

export default class AddHeadline extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveHeadline = this.saveHeadline.bind(this);
        this.newHeadline = this.newHeadline.bind(this);
        this.evaluate = this.evaluate.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false,
            clickbait: "Not yet evaluated.",
            sentiment: -1
        };

    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    saveHeadline() {
        var data = {
            title: this.state.title,
            description: this.state.description,
            clickbait: this.state.clickbait,
            sentiment: this.state.sentiment
        };


        HeadlineDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })


    }

    newHeadline() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        });
    }
    evaluate() {
        const title = this.state.title;
        console.log(title);
        if (title) {
            HeadlineDataService.evaluate(title)
                .then(response => {
                    console.log(response.data['clickbait']);
                    console.log(response.data['sentiment']);
                    this.setState({
                        clickbait: response.data['clickbait'],
                        sentiment: response.data['sentiment']
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            alert("Cannot evaluate the clickbait level of a blank message.")
        }
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newHeadline}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <div>

                            <button
                                className="btn btn-danger  redbtn"
                                onClick={this.evaluate}
                            >Evaluate
                            </button>
                        </div>
                        <div>
                            <label>
                                <strong>Chance of Clickbait:</strong>
                            </label>{" "}
                            {this.state.clickbait !== "Not yet evaluated." ? `${(Math.round(this.state.clickbait * 100) / 100).toFixed(2)}%` : this.state.clickbait}
                        </div>
                        {this.state.clickbait > 50 ? <div>Emotion: {this.state.sentiment * 100}%</div> : ""}
                        <button onClick={this.saveHeadline} className="btn btn-success">
                            Save
                        </button>
                    </div>
                )}
            </div>
        );


    }
}
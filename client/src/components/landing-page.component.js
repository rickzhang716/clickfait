import React, { Component } from "react";
import HeadlineDataService from "../services/headline.service";
import { Link, Redirect } from "react-router-dom";
import { CountUp } from 'use-count-up'




export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.saveHeadline = this.saveHeadline.bind(this);
        this.newHeadline = this.newHeadline.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.clickbaitAnimation = this.clickbaitAnimation.bind(this);
        this.emotionAnimation = this.emotionAnimation.bind(this);

        this.state = {
            id: null,
            title: "",
            published: false,
            submitted: false,
            clickbait: "Not yet evaluated.",
            sentiment: -1,
            evaluated: false
        };

    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
            clickbait: "Not yet evaluated."
        });
    }

    saveHeadline() {
        var data = {
            title: this.state.title,
            clickbait: this.state.clickbait,
            sentiment: this.state.sentiment
        };


        HeadlineDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
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
            published: false,
            submitted: false,
            evaluated: false,
            clickbait: "Not yet evaluated.",
            sentiment: -1,
        });
    }
    evaluate() {
        const title = this.state.title;
        // console.log(title);
        if (title) {
            HeadlineDataService.evaluate(title)
                .then(response => {
                    // console.log(response.data['clickbait']);
                    // console.log(response.data['sentiment']);
                    this.setState({
                        clickbait: (Math.round(response.data['clickbait'] * 100) / 100).toFixed(2),
                        sentiment: response.data['sentiment'] * 100
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

    clickbaitAnimation() {
        const clickbait = parseFloat(this.state.clickbait);
        return <CountUp isCounting end={clickbait} decimalPlaces={2} decimalSeparator="." duration={2} />;
    }
    emotionAnimation() {
        const sentiment = parseFloat(this.state.sentiment);
        return <CountUp isCounting end={sentiment} decimalPlaces={2} decimalSeparator="." duration={2} />;
    }

    render() {
        const redirectToEvaluate = this.state.redirectToEvaluate;
        if (redirectToEvaluate) {
            return <Redirect to="/clickbait" />
        }
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You saved successfully!</h4>
                        <button className="btn btn-success mr-3 space" onClick={this.newHeadline}>
                            Back
                        </button>
                        <Link
                            to={"/headlines"}
                            className=" btn btn-primary space"
                        >
                            View Saved
                        </Link>
                    </div>
                ) : (
                    <div className="container-mt-3">
                        <div className="form-group">

                            <h1 className="text-left">Enter a title and check if it is clickbait!</h1>
                            <div className="search-container">

                                <div className=" pb-3 ">
                                    <div className="search-input-group input-group ">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text py-4 searchicon">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1rem" height="1rem
                                                    " fill="currentColor" className="svg-inline--fa fa-search fa-w-16" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control searchbar "
                                            id="title"
                                            required
                                            value={this.state.title}
                                            onChange={this.onChangeTitle}
                                            name="title"
                                            placeholder="Search a title for a news article, Youtube video title, etc."
                                        />
                                        <div className="input-group-append ">
                                            <button
                                                onClick={this.evaluate}
                                                className="btn-lg searchbutton py-3 "
                                            >Search
                                            </button>
                                        </div>
                                    </div>
                                    <div id="increasing" className="clickbait">
                                        {/* {this.state.clickbait !== "Not yet evaluated." ? `${(this.state.clickbait)}%` : ""} */}
                                        {this.state.clickbait !== "Not yet evaluated." ? `Your title "${this.state.title}" has a ` : ""}
                                        {this.state.clickbait !== "Not yet evaluated." ? this.clickbaitAnimation() : ""}
                                        {this.state.clickbait !== "Not yet evaluated." ? "% chance of being clickbait." : ""}

                                    </div>
                                    <div className="sentiment">
                                        {this.state.clickbait !== "Not yet evaluated." ? `The sentiment score of this clickbait-y title is: ` : ""}
                                        {this.state.clickbait !== "Not yet evaluated." ? this.emotionAnimation() : ""}
                                        {this.state.clickbait !== "Not yet evaluated." ? "%" : ""}
                                    </div>


                                    <button onClick={this.saveHeadline} className="btn btn-success my-4">
                                        Save
                                    </button>
                                </div>


                            </div>
                        </div>


                    </div >
                )
                }
            </div>
        );


    }
}
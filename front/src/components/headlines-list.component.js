import React, { Component } from "react";
import HeadlineDataService from "../services/headline.service";
import { Link } from "react-router-dom";

export default class HeadlinesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveHeadlines = this.retrieveHeadlines.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveHeadline = this.setActiveHeadline.bind(this);
        this.removeAllHeadlines = this.removeAllHeadlines.bind(this);
        this.searchTitle = this.searchTitle.bind(this);


        this.state = {
            headlines: [],
            currentHeadline: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveHeadlines();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveHeadlines() {
        HeadlineDataService.getAll()
            .then(response => {
                this.setState({
                    headlines: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveHeadlines();
        this.setState({
            currentHeadline: null,
            currentIndex: -1
        });
    }

    setActiveHeadline(headline, index) {
        this.setState({
            currentHeadline: headline,
            currentIndex: index
        });
    }

    removeAllHeadlines() {
        HeadlineDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        HeadlineDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    headlines: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }



    render() {
        const { searchTitle, headlines, currentHeadline, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Articles List</h4>

                    <ul className="list-group">
                        {headlines &&
                            headlines.map((headline, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveHeadline(headline, index)}
                                    key={index}
                                >
                                    {headline.title}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllHeadlines}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentHeadline ? (
                        <div>
                            <h4>News Headline</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentHeadline.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentHeadline.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentHeadline.published ? "Published" : "Pending"}
                            </div>
                            <div>
                                <label>
                                    <strong>Chance of Clickbait:</strong>
                                </label>{" "}
                                {currentHeadline.clickbait}
                            </div>

                            <Link
                                to={"/headlines/" + currentHeadline.id}
                                className="m-3 btn btn-sm editbutton border"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on an Article...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
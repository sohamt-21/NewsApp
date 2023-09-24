import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super(); // constructor always runs where object is this called in the folder for example if there are 3 news then 2 times it will be called.

    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }


  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f14aa872617a4b9790b9e57329a19bc1&page=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    }); 
  }

  handlePrevClick = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f14aa872617a4b9790b9e57329a19bc1&page=${this.props.pageSize-1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState(
      { articles: parsedData.articles }
    );

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f14aa872617a4b9790b9e57329a19bc1&page=1&pageSize=${this.props.pageSize+1}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
  }

  render() {
    return (
      <div className="container my-3">
        <div className="text-center">
          <h2>News Top Headlines</h2>
          {this.state.loading && <Spinner />} 
        </div>
        <div className="row">
          {this.state.articles.map((element) => {
            return (<> <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div> </>)
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import SpinnerBar from './spinner'
import propTypes from 'prop-types'

export default class News extends Component {

  static defaultProps = {   // Setting default props,  they are usually created in this way in class based component . Using the static keyword in a class allows you to define properties and methods that are attached to the class itself rather than instances of the class.  
    country : "in",
    pageSize : 10,
    category : "general"

  }

  static propTypes = {   // defining default props types 
    country : propTypes.string,
    pageSize : propTypes.number,
    category : propTypes.string
  }
  
  constructor() {
    super();
    this.title = ""
    this.desc = ""
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0   
    }
    this.defaultUrl = "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/0a80377f57c1762eeb4bbf3372850af5.jpg"
  }


  async componentDidMount() {
    console.log("hello", this.props.pageSize)
    this.setState(
      {loading : true}
    )
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bf1f835549b4f3c808574d460f6c8ea&page=${this.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState(
      {loading : false}
    )
    console.log(parsedData.articles);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults
    })
  }


  handleNextClick = async () => {

      console.log(this.state.page); // Correctly accesses state variable 'page'
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bf1f835549b4f3c808574d460f6c8ea&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState(
        {loading : true}
      )
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData.articles);
      this.setState(
        {loading : false}
      )
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      });

  };


  handlePreviousClick = async () => {
    if(this.state.page - 1 > 0)
    {  console.log(this.state.page); // Correctly accesses state variable 'page'
      this.setState(
        {loading : true}
      )
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bf1f835549b4f3c808574d460f6c8ea&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData.articles);
      this.setState(
        {loading : false}
      )
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
      });
    }
  };

  render() {
    return (
      <div className="container my-3 border border-warning center ">
        <h1 className="text-center">News Monkey - Top headlines</h1>
        {this.state.loading && <SpinnerBar />}
        <div className='row '>
          {this.state.articles.map((element) => {
            return <div key={element.url} className='col-md-4'>
              <NewsItem title={element.title ? element.title.slice(0, 35) : ""} desc={element.description ? element.description.slice(0, 80) : ""} newsUrl={element.url ? element.url : this.defaultUrl} imageUrl={(element.urlToImage) ? element.urlToImage : "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/0a80377f57c1762eeb4bbf3372850af5.jpg"} />
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between my-5'>
          <button disabled={(this.state.page - 1 > 0)?true:false} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalArticles / 18))? true:false} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next  &rarr;</button>
        </div>
      </div>
    )
  }
}

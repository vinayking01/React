import React, { Component } from 'react';
import NewsItem from './NewsItem';
import SpinnerBar from './spinner';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 10,
    category: 'general',
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0,
    };
    this.defaultUrl =
      'https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/0a80377f57c1762eeb4bbf3372850af5.jpg';
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bf1f835549b4f3c808574d460f6c8ea&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  fetchMoreData = async () => {
    setTimeout(()=>{
      this.setState({ page: this.state.page + 1 }, async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bf1f835549b4f3c808574d460f6c8ea&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          loading: false,
        });
      });
    },1000)
    
  };

  render() {
    return (
      <div className="container my-3 border border-warning center ">
        <h1 className="text-center " style={{ marginBottom: '20px' }}>
          News Monkey - Top headlines
        </h1>
        {this.state.loading && <SpinnerBar />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<SpinnerBar />}
        >
          <div className="row" style={{marginTop:"20px"}}>                 {/* Row */} 
            {this.state.articles.map((element, index) => {
              return (
                <div key={element.url + index} className="col-md-4">
                  <NewsItem
                    title={element.title ? element.title.slice(0, 35) : ''}
                    desc={element.description ? element.description.slice(0, 80) : ''}
                    newsUrl={element.url ? element.url : this.defaultUrl}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : 'https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/0a80377f57c1762eeb4bbf3372850af5.jpg'
                    }
                    author={!element.author ? 'Unknown' : element.author}
                    date={new Date(element.publishedAt).toGMTString()}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

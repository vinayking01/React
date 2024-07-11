import React, { Component } from 'react';
import NewsItem from './NewsItem';
import SpinnerBar from './spinner';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar'

export default class News extends Component {
  static defaultProps = {    // setting the default props value
    country: 'in',
    pageSize: 10,
    category: 'general',
  };

  static propTypes = {       // defining the types of default props.
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };

  constructor() {               // instantiate the value 
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0,
      progress: 10
    };
    this.defaultUrl =
      'https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/0a80377f57c1762eeb4bbf3372850af5.jpg';  // this default url will be used if anyone doesn't own any image

     
  }

  async componentDidMount() {
    this.setState({ 
      loading: true,
      progress : 40                 // making the progress bar to reach 40 , then later 70, then at last 100
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.setState({ 
      progress : 70
    });
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.setState({ 
      progress : 100
    });
  }

  fetchMoreData = async () => {
    setTimeout(()=>{
      this.setState({ page: this.state.page + 1 }, async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={0}         // this will run when progress reach the number of 100
      />
        <h1 className="text-center " style={{ marginBottom: '20px' }}>
          News Monkey - Top headlines
        </h1>
        {this.state.loading && <SpinnerBar />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<SpinnerBar />} style={{overflowX:"hidden"}}
        >
          <div className="row" style={{marginTop:"20px"}}>     {/* Row */} 
            <div>
              </div>            
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
              }
              )
                }
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'

export default class NewsItem extends Component {
constructor()
{
  super()
}
  render() {
    // eslint-disable-next-line react/prop-types, no-unused-vars
    let {title, desc, imageUrl, newsUrl} = this.props
    return (
      <div className="d-flex justify-content-center">
      <div className='card' style={{width:"18rem"}}>
      <img src={imageUrl} alt="" className='card-img-top'  />
      <div className='card-body'>
        <h5 className='card-title'>{(title.length < 45)?title:`${title}....`}</h5>
        <p className='card-text'>{(desc.length < 80)?desc:`${desc}....`}</p>
        <a href={newsUrl} className='btn btn-sm btn-primary' target='_blank'>Go somewhere</a>
      </div>
      </div>
      </div>
    )
  }
}

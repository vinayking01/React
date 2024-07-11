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
    let {title, desc, imageUrl, newsUrl, author, date, source} = this.props
    return (
      <div className="d-flex justify-content-center">
      <div className='card position-relative' style={{width:"18rem"}}>
      <span className="position-absolute badge rounded-pill bg-danger" style={{top: "0%", right: "0%", zIndex:1}}>
    {source}
    <span className="visually-hidden">unread messages</span>
  </span>
      <img src={imageUrl} alt="" className='card-img-top'  />
      <div className='card-body'>
        <h5 className='card-title'>{(title.length < 45)?title:`${title}....`}</h5>
        <p className='card-text'>{(desc.length < 80)?desc:`${desc}....`}</p>
        <p className='card-text'> <small className='tet-muted ' style={{fontStyle:"italic", color:"grey"}}>`By {author}  on {date}`</small> </p>
        <a href={newsUrl} className='btn btn-sm btn-primary' target='_blank'>Read More</a>
      </div>
      </div>
      </div>
    )
  }
}

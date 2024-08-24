import React from 'react'

const JobPosting = ({id,by,title,time,url}) => {
  const formattedtime=new Date(time*1000).toLocaleString()
  return (
    // eslint-disable-next-line
    <div className='post' role='listItem'>
      <h2 className="post__title">
        <a className={url?"":"inactivelink"} 
        href={url}
        >{title}</a>
      </h2>
      <span className='post_data'>by {by} at {formattedtime}</span>
    </div>
  )
}

export default JobPosting

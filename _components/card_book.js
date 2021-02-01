import { react } from 'react'
import Link from 'next/link'

const CardBook = (props) => (
  <div>
    <h3>
      <Link href={props.book.link}>{props.book.name}</Link>
    </h3>
    <img src={props.book.cover}/>
    {props.book.authors.map(author => 
      <span>{author}</span>
    )}
    <p>{props.book.description}</p>
  </div>
)

export default CardBook
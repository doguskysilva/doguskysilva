import { react } from 'react'
import Link from 'next/link'

const CardBook = (props) => (
  <div className="w-full lg:flex mb-4 shadow-md">
    <div className="h-32 lg:h-auto lg:w-32 flex-none bg-cover text-center overflow-hidden">
      <a href={props.book.link}>
        <img src={props.book.cover} className="border-2 border-gray-900" />
      </a>
    </div>
    <div className="p-4 pt-2 flex flex-col justify-between leading-normal">
      <div className="mb-2">
        <div className="font-bold text-xl mb-2">
          <a href={props.book.link}>{props.book.name}</a>
        </div>
        <p className="text-justify">
          {props.book.description}
        </p>
      </div>
      <div className="flex items-center">
        {props.book.authors.map(author => 
          <span className="leading-none mr-3 text-sm italic">{author}</span>
        )}
      </div>
    </div>
  </div>
)

export default CardBook
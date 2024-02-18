import { INews } from "../../types/types";

export default function BlogItem({ url, publishedAt, urlToImage, title }: INews) {
  return (
    <a className="blog-item" href={url} target="_blank" rel="noopener noreferrer">
      <li key={publishedAt}>
        <div className="block-image">
          <img src={urlToImage} className="medium-album-image" alt="Article Image" />
        </div>
        <h3 className="small-header">{title}</h3>
        <p className="small-text">{publishedAt}</p>
      </li>
    </a>
  )
}
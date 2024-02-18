import { DefaultSlideProps } from "../../types/interfaces";

export default function DefaultSlide({ urlToImage, title, fakeImg }: DefaultSlideProps) {
  return (
    <div className="news-slide-item">
      <div className="news-slide-image-block">
        <img src={urlToImage ? urlToImage : fakeImg} className="medium-album-image" alt="News Image" />
        <div className="news-slide-gradient"></div>
        <div className="news-slide-text">
          <span className="small-header">{title}</span>
        </div>
      </div>
    </div>
  )
}
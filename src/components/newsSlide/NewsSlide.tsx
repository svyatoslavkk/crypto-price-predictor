import { Link } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useGetCryptoNewsQuery } from "../../redux/features/api/newsApi";
import { News } from "../../types/types";

export default function NewsSlide() {
  const adaptiveImg = 'https://ichef.bbci.co.uk/news/976/cpsprodpb/11EAB/production/_131278337_gettyimages-1436167319.jpg';
  const { data: cryptoNews, error: cryptoNewsError, isLoading: cryptoNewsLoading } = useGetCryptoNewsQuery({});
  const sortedNews = cryptoNews?.articles.slice().sort((a: News, b: News) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <section className="news-slide">
      <div className="header-section">
        <h3 className="small-header">News</h3>
        <Link to="/news">
          <button className="transparent-btn">
            More
          </button>
        </Link>
      </div>
      <Splide 
        options={ {
          type: 'loop',
          perPage: 1,
          perMove: 1,
          rewind : true,
          height: '14.5rem',
          pagination: true,
          gap    : '0.5rem',
        } }
        aria-labelledby="basic-example-heading"
      >
        {sortedNews && sortedNews.slice(0, 3).map((item: News) => (
          <SplideSlide key={item.url}>
              <div className="news-slide-item">
                <div className="news-slide-image-block">
                  <img src={item.urlToImage || adaptiveImg} className="medium-album-image" alt="News Image" />
                  <div className="news-slide-gradient"></div>
                  <span className="news-slide-text">
                    <span className="small-header">{item.title}</span>
                  </span>
                </div>
              </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  )
}
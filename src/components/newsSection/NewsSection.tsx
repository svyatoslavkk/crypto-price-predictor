import { useGetCryptoNewsQuery } from "../../redux/features/api/newsApi";
import { Link } from "react-router-dom";
import { News } from "../../types/types";
import { newsSectionLoadingUI } from "../ui/loadingUI";
import { newsSectionErrorUI } from "../ui/errorUI";

export default function NewsSection() {
  const adaptiveImg = 'https://play-lh.googleusercontent.com/jGpj_gR6iUi1FqHZ8w__2G0zonoONbRYkYIgARnKpOtKL7we9d213Bvn6AOUMF5WVgOV=w240-h480-rw';
  const { data: cryptoNews, error: cryptoNewsError, isLoading: cryptoNewsLoading } = useGetCryptoNewsQuery({});
  const sortedNews = cryptoNews?.articles.slice().sort((a: News, b: News) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <div className="list-column news-section">
      <div className="header-section">
        <h3 className="small-header">News</h3>
        <Link to="/news">
          <button className="transparent-btn">
            More
          </button>
        </Link>
      </div>
      <ul className="list-column" style={{marginBottom: 55}}>
        {cryptoNewsLoading && newsSectionLoadingUI}
        {cryptoNewsError && newsSectionErrorUI}
        {sortedNews && sortedNews.slice(0, 3).map((item: News) => (
          <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">
            <li key={item.publishedAt} className="list-item">
              <img src={item.urlToImage || adaptiveImg} className="large-sq-img" alt="Article Image" />
              <div className="text-items-column">
                <h3 className="small-text">{item.title}</h3>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  )
}
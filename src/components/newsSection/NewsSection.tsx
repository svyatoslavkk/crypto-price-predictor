import { useGetCryptoNewsQuery } from "../../redux/features/api/newsApi";

export default function NewsSection() {
  const adaptiveImg = 'https://play-lh.googleusercontent.com/jGpj_gR6iUi1FqHZ8w__2G0zonoONbRYkYIgARnKpOtKL7we9d213Bvn6AOUMF5WVgOV=w240-h480-rw';
  const { data: cryptoNews } = useGetCryptoNewsQuery();
  const sortedNews = cryptoNews?.articles.slice().sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
  return (
    <div className="news-section">
      <div className="top-section">
        <h3 className="medium-header">News</h3>
        <button>
          More
        </button>
      </div>
      <div className="list-column" style={{marginBottom: 80}}>
        {sortedNews && sortedNews.slice(0, 3).map((item) => (
          <div className="list-item">
            <img src={item.urlToImage || adaptiveImg} className="large-sq-img" alt="Article Image" />
            <div className="text-items-column">
              <h3 className="small-header">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react';
import TopButtons from "../../components/topButtons/TopButtons";
import { useGetCryptoNewsQuery } from "../../redux/features/api/newsApi";
import { useNavigate, useLocation } from 'react-router-dom';

interface BlogItem {
  urlToImage: string;
  title: string;
  publishedAt: string;
}

export default function News() {
  const adaptiveImg = 'https://blockbuild.africa/wp-content/uploads/2021/11/Crypto-project-1.jpg';
  const { data: cryptoNews } = useGetCryptoNewsQuery();
  const sortedNews = cryptoNews?.articles.slice().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get('page');
    const parsedPage = pageParam ? Number(pageParam) : 1;
    setCurrentPage(parsedPage);
  }, [location.search]);

  useEffect(() => {
    handlePageChange(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/news?page=${page}`);
  };

  const pageTitle = "News";

  return (
    <div className="news">
      <TopButtons pageTitle={pageTitle} />
      <ul className="list-column">
        {sortedNews && sortedNews.slice((currentPage - 1) * 10, currentPage * 10).map((item: BlogItem) => (
          <li className="blog-item" key={item.publishedAt}>
            <img src={item.urlToImage || adaptiveImg} className="medium-album-image" alt="Article Image" />
            <h3 className="small-header">{item.title}</h3>
            <p className="small-text">{item.publishedAt}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedNews?.length / 10) }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}
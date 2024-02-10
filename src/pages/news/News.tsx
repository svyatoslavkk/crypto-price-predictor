import { useState, useEffect } from 'react';
import TopButtons from "../../components/topButtons/TopButtons";
import { useGetCryptoNewsQuery } from "../../redux/features/api/newsApi";
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from '../../components/sideBar/SideBar';
import ProfilePanel from '../../components/profilePanel/ProfilePanel';
import { INews } from '../../types/types';

interface BlogItem {
  urlToImage: string;
  url: string;
  title: string;
  publishedAt: string;
}

export default function News() {
  const adaptiveImg = 'https://blockbuild.africa/wp-content/uploads/2021/11/Crypto-project-1.jpg';
  const { data: cryptoNews } = useGetCryptoNewsQuery({});
  const sortedNews = cryptoNews?.articles.slice().sort((a: INews, b: INews) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/news?page=${page}`);
  };

  const pageTitle = "News";

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get('page');
    const parsedPage = pageParam ? Number(pageParam) : 1;
    setCurrentPage(parsedPage);
  }, [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    handlePageChange(1);
  }, []);

  return (
    <div className="screen-container">
      <SideBar />
      <div className="news">
        <TopButtons pageTitle={pageTitle} />
        <ul className="news-column">
          {sortedNews && sortedNews.slice((currentPage - 1) * 10, currentPage * 10).map((item: BlogItem) => (
            <a className="blog-item" href={item.url} target="_blank" rel="noopener noreferrer">
              <li key={item.publishedAt}>
                <div className="block-image">
                  <img src={item.urlToImage ? item.urlToImage : adaptiveImg} className="medium-album-image" alt="Article Image" />
                </div>
                <h3 className="small-header">{item.title}</h3>
                <p className="small-text">{item.publishedAt}</p>
              </li>
            </a>
          ))}
        </ul>
        <div className="pagination">
          {Array.from({ length: Math.ceil(sortedNews?.length / 10) }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn`}
              onClick={() => handlePageChange(page)}
              style={{ backgroundColor: page === currentPage ? 'orange' : '' }}
            >
              <span className={`small-header ${page === currentPage ? 'active-text' : ''}`}>{page}</span>
            </button>
          ))}
        </div>
      </div>
      <ProfilePanel />
    </div>
  )
}
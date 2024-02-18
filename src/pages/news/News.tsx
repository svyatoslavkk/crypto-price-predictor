import { useState, useEffect } from 'react';
import TopButtons from "../../components/topButtons/TopButtons";
import { useGetCryptoNewsQuery } from "../../redux/features/api/newsApi";
import { useNavigate, useLocation } from 'react-router-dom';
import { INews } from '../../types/types';
import Pagination from '../../components/util/Pagination';
import BlogItem from '../../components/shared-components/BlogItem';

export default function News() {
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
    <div className="news">
      <TopButtons pageTitle={pageTitle} />
      <ul className="news-column">
        {sortedNews && sortedNews.slice((currentPage - 1) * 10, currentPage * 10).map((item: INews) => (
          <BlogItem 
            url={item.url}
            urlToImage={item.urlToImage}
            title={item.title}
            publishedAt = {item.publishedAt}
          />
        ))}
      </ul>
      <Pagination 
        sortedNews={sortedNews}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  )
}
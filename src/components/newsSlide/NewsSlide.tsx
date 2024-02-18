import { Link } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useGetCryptoNewsQuery } from "../../redux/features/api/newsApi";
import { newsSlideLoadingUI } from "../ui/loadingUI";
import { INews } from "../../types/types";
import { MORE_TITLE, NEWS_TITLE, fakeNewsImg } from "../../constants/constants";
import DefaultSlide from "../shared-components/DefaultSlide";
import TransparentBtn from "../ui/TransparentBtn";

export default function NewsSlide() {
  const { data: cryptoNews, isLoading: cryptoNewsLoading } = useGetCryptoNewsQuery({});
  const sortedNews = cryptoNews?.articles.slice().sort((a: INews, b: INews) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  if (cryptoNewsLoading) {
    return newsSlideLoadingUI;
  }

  return (
    <section className="news-slide">
      <div className="header-section">
        <h3 className="small-header">{NEWS_TITLE}</h3>
        <Link to="/news">
          <TransparentBtn title={MORE_TITLE} />
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
        {sortedNews && sortedNews.slice(0, 3).map((item: INews) => (
          <SplideSlide key={item.url}>
            <DefaultSlide 
              urlToImage={item.urlToImage}
              title={item.title}
              fakeImg={fakeNewsImg}
            />
          </SplideSlide>
        ))}
      </Splide>
    </section>
  )
}
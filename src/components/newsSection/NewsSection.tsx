import { useGetCryptoNewsQuery } from "../../redux/features/api/newsApi";
import { INews } from "../../types/types";
import { newsSectionLoadingUI } from "../ui/loadingUI";
import { newsSectionErrorUI } from "../ui/errorUI";
import { MORE_TITLE, NEWS_TITLE, fakeNewsImg } from "../../constants/constants";
import HeaderSection from "../shared-components/HeaderSection";
import ListItem from "../shared-components/ListItem";

export default function NewsSection() {
  const { data: cryptoNews, error: cryptoNewsError, isLoading: cryptoNewsLoading } = useGetCryptoNewsQuery({});
  const sortedNews = cryptoNews?.articles.slice().sort((a: INews, b: INews) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <div className="list-column news-section">
      <HeaderSection 
        title={NEWS_TITLE}
        link={"/news"}
        buttonText={MORE_TITLE}
      />
      <ul className="list-column" style={{marginBottom: 55}}>
        {cryptoNewsLoading && newsSectionLoadingUI}
        {cryptoNewsError && newsSectionErrorUI}
        {sortedNews && sortedNews.slice(0, 3).map((item: INews) => (
          <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">
            <ListItem 
              image={item.urlToImage}
              title={item.title}
              fakeImg={fakeNewsImg}
            />
          </a>
        ))}
      </ul>
    </div>
  )
}
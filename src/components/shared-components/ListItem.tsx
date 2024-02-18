import { ListItemProps } from "../../types/interfaces";
import MiniBtn from "../ui/MiniBtn";

export default function ListItem({ id, image, title, fakeImg, onClick, buttonText }: ListItemProps) {
  return (
    <li key={id} className="list-item">
      <div className="flex-info">
        <img src={image ? image : fakeImg} className="medium-sq-img" alt="Article Image" />
        <div className="text-items-column">
          <h3 className="small-text">{title}</h3>
        </div>
      </div>
      {onClick && (
        <MiniBtn
          buttonText={buttonText}
          onClick={onClick}
        />
      )}
    </li>
  )
}

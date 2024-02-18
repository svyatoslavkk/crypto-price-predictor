import { Link } from "react-router-dom"
import TransparentBtn from "../ui/TransparentBtn"
import { HeaderSectionProps } from "../../types/interfaces"

export default function HeaderSection({ title, link, buttonText }: HeaderSectionProps) {
  return (
    <div className="header-section">
      <h3 className="small-header">{title}</h3>
      {link && (
        <Link to="/news">
          <TransparentBtn title={buttonText} />
        </Link>
      )}
    </div>
  )
}
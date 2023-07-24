import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";

const Menu = ({ updateActivePage }) => { // Receive updateActivePage as a prop
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link
              to={listItem.url}
              className="listItem"
              key={listItem.id}
              onClick={() => updateActivePage(listItem.title)} // Call updateActivePage on link click
            >
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
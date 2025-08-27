import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import handleCardClick from "../App/App"

function ClothesSection({ onCardClick }) {
    return (
    <div className="clothes-section">
        <div>
            <p>your items</p>
            <button className="add__button">+ Add New</button>
            <ul className="clothes-section-items">
          {defaultClothingItems.map((item) => {
            return (<ItemCard key={item._id} item={item} 
              onCardClick={onCardClick} 
             />
            )
          })}
        </ul>
        </div>
    </div>
    );
}

export default ClothesSection;
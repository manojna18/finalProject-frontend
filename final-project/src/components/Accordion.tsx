import { useContext, useState } from "react";
import "./css/Accordion.css";
import RecipeCard from "./RecipeCard";
import AccountContext from "../context/AccountContext";
import Day from "../models/Day";

interface ItemProps {
  isOpen: boolean;
  isToday: boolean;
  day: Day;
  onClick(): void;
}

const AccordionItem = ({ isOpen, isToday, day, onClick }: ItemProps) => {
  return (
    <div className="AccordionItem">
      <button
        className={`day-container ${isOpen ? "active" : ""}`}
        onClick={onClick}
      >
        <p className="date">{isToday ? "Today" : day.date}</p>
      </button>
      <div
        className="details-container"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <p>{`Daily Calories: ${day?.totalDailyCalories}`}</p>
        {day.recipes.map((item) => {
          return (
            <div className="nutrition-recipe-div" key={item.id}>
                
              <RecipeCard recipe={item} />{" "}
              <p className="quantity">{item.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { account } = useContext(AccountContext);
  const handleItemClick = (index: number): void => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };
  return (
    <div className="Accordion">
      {account!.meals.map((day, index) => {
        return (
          <AccordionItem
            key={index}
            day={day}
            isToday={index === 6}
            isOpen={index === activeIndex}
            onClick={() => {
              handleItemClick(index);
            }}
          />
        );
      })}
    </div>
  );
};

export default Accordion;

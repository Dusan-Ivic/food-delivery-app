import { FaPizzaSlice, FaBurger, FaIceCream } from "react-icons/fa6";
import { GiTacos, GiFishEggs, GiCroissant } from "react-icons/gi";
import { BiSolidSushi } from "react-icons/bi";

const categoryIcons = [
  {
    name: "Pizza",
    icon: FaPizzaSlice,
  },
  {
    name: "Burgers",
    icon: FaBurger,
  },
  {
    name: "Sushi",
    icon: BiSolidSushi,
  },
  {
    name: "Mexican",
    icon: GiTacos,
  },
  {
    name: "Groceries",
    icon: GiFishEggs,
  },
  {
    name: "Ice Cream",
    icon: FaIceCream,
  },
  {
    name: "Bakery",
    icon: GiCroissant,
  },
];

export default categoryIcons;

import { GiChickenLeg, GiCupcake, GiCutLemon, GiDoubleFish,
  GiHamburger,GiMilkCarton, GiMushroomGills, GiPaperBagOpen,GiStrawberry,
  GiGreenhouse, GiBeerBottle, GiButter,
} from 'react-icons/gi';

export const getImage = (category) => {
  switch(category) {
    case 'meat':
      return <GiChickenLeg size="2rem" />;
    case 'dairy':
      return <GiMilkCarton size="2rem" />;
    case 'vegetables':
      return <GiMushroomGills size="2rem" />;
    case 'fat':
      return <GiButter size="2rem" />;
    case 'seafood':
      return <GiDoubleFish size="2rem" />;
    case 'drinks':
      return <GiBeerBottle size="2rem" />;
    case 'berry':
      return <GiStrawberry size="2rem" />;
    case 'house staff':
      return <GiGreenhouse size="2rem" />;
    case 'sweeties':
      return <GiCupcake size="2rem" />;
    case 'fastfood':
      return <GiHamburger size="2rem" />;
    case 'fruits':
      return <GiCutLemon size="2rem" />;
    default:
      return <GiPaperBagOpen size="2rem"/>;
  }
}

export const handleCapitalize = (str) => str ? str?.charAt(0).toUpperCase() + str?.slice(1) : null;

export const totalPrice = (items) => items?.reduce((sum, { total }) => sum + total, 0).toFixed(2)

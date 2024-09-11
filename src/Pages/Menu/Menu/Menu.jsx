import { Helmet } from 'react-helmet-async';
import Cover from '../../../Shared/Cover/Cover';
import menuimg from '../../../assets/menu/banner3.jpg'
import desert from '../../../assets/menu/dessert-bg.jpeg'
import pizzaimg from '../../../assets/menu/pizza-bg.jpg'
import saladimg from '../../../assets/menu/salad-bg.jpg'
import Soupbg from '../../../assets/menu/soup-bg.jpg'
import UseMenu from '../../../Hooks/UseMenu';
import SectionTitle from '../../../components/sectiontitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';


const Menu = () => {
    const [menu] = UseMenu();
    const salad = menu.filter(item => item.category === 'salad')
    const drinks = menu.filter(item => item.category === 'drinks')
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')

    
    return (
        <div>
            <Helmet>
                <title>Menu</title>
        
            </Helmet>
            <Cover img={menuimg} title="Our Menu" ></Cover>
            <SectionTitle

            Subheadigs="Don't Miss" 
            Headings="Today's Offer"
            
            ></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>

            {/* desert  */}
            <MenuCategory
            items={dessert}
            title="desert"
            coverimg={desert}
            
            ></MenuCategory>
            
            <MenuCategory items={offered}></MenuCategory>

            {/* Pizza  */}
            <MenuCategory
            items={pizza}
            title="pizza"
            coverimg={pizzaimg}
            
            ></MenuCategory>
            
            {/* Salad  */}
            <MenuCategory
            items={salad}
            title="salad"
            coverimg={saladimg}
            
            ></MenuCategory>
            
            {/* Soup  */}
            <MenuCategory
            items={drinks}
            title="soup"
            coverimg={Soupbg}
            
            ></MenuCategory>
            
           
            
        </div>
    );
};

export default Menu;
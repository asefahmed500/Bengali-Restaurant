
import SectionTitle from "../../components/sectiontitle/SectionTitle";
import UseMenu from "../../Hooks/UseMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
    const [menu] = UseMenu();
    const popular = menu.filter(item => item.category === 'popular')

    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular');
    //             setMenu(popularItems);
    //         })
    //         .catch(error => console.error('Error fetching the menu:', error));
    // }, []);

    return (
        <section className="mb-12">
            <SectionTitle
                Headings="From Our Menu"
                Subheadigs="Popular Items"
            />
            <div className="grid md:grid-cols-2 gap-10">
                {popular.map((item , index) => (
                    <MenuItem key={item.id || index}
                        item={item}
                    ></MenuItem>
                ))}
            </div>
            <button className="btn btn-outline">view full menu </button>
        </section>
    );
};

export default PopularMenu;

import SectionTitle from "../../components/sectiontitle/SectionTitle";
import featuredimage from "../../assets/home/featured.jpg"
import './featured.css'

const Featured = () => {
    return (
        <div className="featured-item text-white pt-8 my-20">
            <SectionTitle
                Subheadigs="Check it out"
                Headings="Featured item"

            ></SectionTitle>
            <div className="md:flex justify-center  items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 px-36">
                <div>
                    <img src={featuredimage} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>July 16 ,2024</p>
                    <p className="uppercase">Where Can I Get Some</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Read more</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
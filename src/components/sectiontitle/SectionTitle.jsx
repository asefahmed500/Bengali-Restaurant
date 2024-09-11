
const SectionTitle = ({Headings , Subheadigs}) => {
    return (
        <div className="text-center mx-auto md:w-4/12 my-8">
            <p className="text-yellow-500 mb-2" >{Subheadigs}</p>
            <h3 className="text-3xl uppercase border-y-4 py-4" >{Headings}</h3>
        </div>
    );
};

export default SectionTitle;
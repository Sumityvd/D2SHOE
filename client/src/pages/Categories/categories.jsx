import React from "react";
import CategoryCard from "../../components/Category-card";

const Categories = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch("https://d2shoe.onrender.com/api/products/categories")
            .then((res) => res.json())
            .then((responseData) => {
                if (responseData.success && responseData.data) {
                    setData(responseData.data);
                } else {
                    setError(responseData.message || 'Failed to load categories');
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center p-10">Loading categories...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    
    const todisplay = data && data.length > 0 
        ? data.map((item) => (
            <CategoryCard 
                key={item.id} 
                id={item.id}
                categoryId={item.id}
                shoename={item.shoename}
                brand={item.supplier?.supplierName}
                price={item.price}
                shoeImage={item.shoeImage}
            />
          ))
        : <div className="text-center">No categories found</div>;
    return (
        <div>
            <div className="text-center p-10">
                <h1 className="categories text-4xl mb-4 font-medium">
                    Explore our amazing Categories!
                </h1>
            </div>
            <div
                id="Projects"
                className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
            >
                {todisplay}
            </div>
        </div>
    );
};

export default Categories;

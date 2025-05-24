import { useState, useEffect } from 'react'
import Item from '../components/Item'
import ItemDetails from '../components/ItemDetails'
import axios from 'axios'
import CardItemHomePage from '../components/CardItemHomePage'
import HeaderPhoto from '@/components/HeaderPhoto'
import ServicesToHelp from '@/components/HomePageComponents/ServicesToHelp'
import Footer from '@/components/Footer/Footer'

const HomeDecoration = () => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("home-decoration")
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    getItems();
  }, [category,priceRange]);

  const getItems = () => {
    axios.get(`https://dummyjson.com/products/category/${category}`)
    .then(res => {
      setProducts(res.data.products)
    }).catch(err => {
      console.log(err);
    })
  }


  const handleCategoryChange = (e) => {
    setCategory(e.target.value)

  }

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value); // עדכון הקטגוריה לפי הבחירה ב-select
  };

  return (
<>
    <div>
    <HeaderPhoto image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D" title={"shopping and department store."} paragraph={"Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance."}/>
    <div className="flex flex-col gap-12 p-5">
        <div className="mt-24 flex gap-2">
        <select id="select-option" value={category} onChange={handleCategoryChange} className="border p-2 rounded-full bg-gray-100">
          <option value="home-decoration">Home-decoration</option>
          <option value="kitchen-accessories">Kitchen-accessories</option>
          <option value="furniture">Furniture</option>
        </select>

         <select id="select-price-range" value={priceRange} onChange={handlePriceRangeChange} className="border p-2 rounded-full bg-gray-100">
            <option value="all">All prices</option>
            <option value="under-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
          </select> 
      </div>
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
      {products.filter(products => {
        if (priceRange === "under-50") return products.price < 50;
        if (priceRange === "50-100") return products.price >= 50 && products.price <= 100;
        if (priceRange === "100-200") return products.price >= 100 && products.price <= 200;
        if (priceRange === "all") return true; // אם לא סינון, מציג הכל
        
      }).length === 0 ? (
        <p>No results found</p> 
      ) : products.filter((product) => {
        if (priceRange === "under-50") return product.price < 50;
        if (priceRange === "50-100") return product.price >= 50 && product.price <= 100;
        if (priceRange === "100-200") return product.price >= 100 && product.price <= 200;
        if (priceRange === "all") return true; // אם לא נבחר סינון, מציג הכל
      })
      .map(products => (
        <CardItemHomePage products={products}/>
      ))}
    </div>
    </div>
    <ServicesToHelp />
    </div>
    <Footer />
    </>
  )
}

export default HomeDecoration

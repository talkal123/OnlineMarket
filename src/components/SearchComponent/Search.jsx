import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="relative z-10">
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search products..."
        className="w-full"
      />

      {search.trim() !== "" && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg border border-gray-200">
          {filteredProducts.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id}>
              <div className="p-4 hover:bg-gray-100 cursor-pointer flex gap-4 rounded-lg transition">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <div className="font-semibold text-lg text-gray-800 truncate">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {item.brand || "No Brand"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserLayout from "../../layout";
import CategoryCard from "../../components/CategoryCard";
import ProdcutCard from "../../components/ProdcutCard";
import { AiOutlineRight } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import prodcutsData from "../../static/db/products.json";

const Categories = [
  {
    name: "CLOTHS",
    items: 5,
  },
  {
    name: "CLOTHS",
    items: 5,
  },
  {
    name: "CLOTHS",
    items: 5,
  },
  {
    name: "CLOTHS",
    items: 5,
  },
  {
    name: "CLOTHS",
    items: 5,
  },
];

const sorted = { name: "Name", price: "Price" };

const Home = () => {
  const [prodcuts, setProdcuts] = useState([]);


  const sort = (sortBy, data) => {
    if (sortBy === sorted.name) {
      const newProdcuts = data.sort((a, b) => a.name.localeCompare(b.name));

      return setProdcuts([...newProdcuts]);
    }

    const newProdcuts = data.sort((a, b) => +a.price - +b.price);
    return setProdcuts([...newProdcuts]);
  };

  useEffect(() => sort(sorted.name, prodcutsData), []);

  return (
    <UserLayout>
      <main>
        <section className="shop-categories bg-light py-3">
          <div className="container-fluid">
            <motion.div
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
            >
              <div className="navigate px-lg-5 py-3 ps-3">
                <div className="container flex-between align-items-center flex-column flex-md-row">
                  <h2 className="fs-5 fw-bold">Shop</h2>

                  <div className="navigate-items flex-center mt-2 mt-lg-0">
                    <p className="item fw-bold m-0 me-1">Home</p>
                    <AiOutlineRight />
                    <p className="item text-muted m-0 ms-1">Shop</p>
                  </div>
                </div>
              </div>

              <div className="categories">
                <div className="row flex-center">
                  {Categories.map((category, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 * idx }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="col-lg-2 py-2 py-lg-0 px-1"
                    >
                      <CategoryCard name={category.name} items={category.items} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="result pb-5 bg-white">
          <div className="container">
            <nav className="navigate px-lg-5 py-3 ps-3 flex-between align-items-center flex-column flex-md-row">
              <h2 className="fs-6 m-0 mb-4 flex-center mb-md-0">
                Showing all {prodcutsData.length} results
              </h2>

              <div className="search-bar mb-4 mb-md-0 flex-center">
                <div className="input-group border">
                  <input
                    type="text"
                    className="form-control bg-light border-0 hide-box-shadow"
                    placeholder="Search"
                  />
                  <button
                    className="btn bg-light border-0 flex-center"
                    type="button"
                    id="button-addon2"
                  >
                    <BiSearch size={23} />
                  </button>
                </div>
              </div>
            </nav>

            <div className="results">
              <div className="row">
                {prodcuts?.map((prodcut, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="col-md-3 py-3"
                  >
                    <ProdcutCard prodcut={prodcut} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </UserLayout>
  );
};

export default Home;

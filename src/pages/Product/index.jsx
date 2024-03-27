import React, {  useMemo, useState } from "react";
import UserLayout from "../../layout";
import GetStarts from "../../components/GetStart";
import { useParams, Navigate } from "react-router-dom";
import products from "../../static/db/products.json";

import {
  AiOutlineRight,
  AiOutlineLeft,
} from "react-icons/ai";

const getCurrentProduct = (id) => {
  const currentProduct = products.find((product) => product.id == id);
  const imgs = [
    currentProduct?.img,
    "/static/thumb/01.jpg",
    "/static/thumb/02.jpg",
  ];

  return [currentProduct, imgs];
};

const ProductPage = () => {
  const { id } = useParams();
  const [currentProduct, imgs] = useMemo(() => getCurrentProduct(id), [id]);
  const [currentImg, setCurrentImg] = useState(currentProduct?.img);




  const nextImg = () => {
    const currentIdx = imgs.findIndex((img) => img === currentImg);

    if (imgs.length <= currentIdx + 1) return setCurrentImg(imgs[0]);

    setCurrentImg(imgs[currentIdx + 1]);
  };

  const prevImg = () => {
    const currentIdx = imgs.findIndex((img) => img === currentImg);

    if (!currentIdx) return setCurrentImg(imgs.at(-1));

    setCurrentImg(imgs[currentIdx - 1]);
  };

  

  return currentProduct ? (
    <UserLayout>
      <section className="container py-3">
        <div className="product py-4 pb-5 mt-3 row">
          <div className="imgs col-md-4">
            <div className="img position-relative">
              <button
                className="carousel-control-prev text-light"
                style={{ opacity: 1 }}
                type="button"
                onClick={prevImg}
              >
                <AiOutlineLeft size={40} />
                <span className="visually-hidden">Previous</span>
              </button>

              <img
                height={350}
                width={400}
                className="w-100"
                src={currentImg}
                alt=""
              />

              <button
                className="carousel-control-next text-light"
                style={{ opacity: 1 }}
                type="button"
                onClick={nextImg}
              >
                <AiOutlineRight size={40} />
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className="imgs flex-center mt-3 gap-2">
              {imgs.map((img, idx) => (
                <img
                  key={idx}
                  className="cu-pointer"
                  width={80}
                  height={80}
                  src={img}
                  onClick={() => setCurrentImg(img)}
                  alt=""
                />
              ))}
            </div>
          </div>

          <div className="info col-md-5">
            <p className="name fw-bold fs-4 mt-2">{currentProduct.name}</p>

            <div className="start">
              <GetStarts item={currentProduct.rate} />
              <span className="text-muted small ms-1">10 Reviews</span>
            </div>

            <p className="price mb-0 mt-3 fs-3 fw-bold">
              ${currentProduct.price}
            </p>
            <p className="small mb-3">
              Availability :{" "}
              <span className="text-primary fw-bold">In Stock</span>
            </p>

            <p className="description small text-muted">
              {currentProduct.description}
            </p>

            <hr />

            <ul className="list-unstyled flex-center justify-content-start">
              {currentProduct.colors.map((color, idx) => (
                <li key={idx} className="cu-pointer">
                  <p
                    className="rounded-circle mx-1"
                    style={{
                      background: color,
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

      
 </UserLayout> ) : (
    <Navigate to="/" />
  );
};

export default ProductPage;


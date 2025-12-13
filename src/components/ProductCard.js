// 'use client';
//
// import React, { useState } from 'react';
// import '@/styles/shop.css';
//
// export default function ProductCard({ product }) {
//   // product: { id, name, base_price, category, images: [main, alt], popularity }
//   const [hover, setHover] = useState(false);
//   const main = product.images && product.images[0] ? product.images[0] : '/assets/images/product_placeholder.png';
//   const alt = product.images && product.images[1] ? product.images[1] : main;
//
//   return (
//     <article
//       className="product-card"
//       onMouseEnter={()=>setHover(true)}
//       onMouseLeave={()=>setHover(false)}
//       tabIndex="0"
//       aria-labelledby={`product-name-${product.id}`}
//     >
//       <div className="product-card-media">
//         <img src={ hover ? alt : main } alt={product.name} />
//         {/* small hearts / tags area could be added */}
//       </div>
//
//       <div className="product-card-body">
//         <h3 id={`product-name-${product.id}`} className="product-name">{product.name}</h3>
//         <p className="product-meta">{product.category}</p>
//         <div className="product-row">
//           <div className="product-price">{Number(product.base_price).toLocaleString('fa-IR')} تومان</div>
//           <button className="add-btn" aria-label="افزودن به سبد">+</button>
//         </div>
//       </div>
//     </article>
//   );
// }

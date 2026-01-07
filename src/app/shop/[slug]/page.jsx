'use client';

import React, { useMemo, useState } from 'react';
import '@/styles/product-page.css';

import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';

// Mock data (فعلاً). بعداً از API می‌گیریم.
const MOCK_PRODUCT = {
  id: 101,
  slug: 'hoodie-ghobar-black',
  title: 'هودی رادیو غبار – چاپ زرد',
  brand: 'Radio Ghobar',
  price: 1290000,
  oldPrice: 1490000,
  inStock: true,
  rating: 4.6,
  reviewCount: 38,
  shortDesc: 'هودی با پارچه دورس گرم، چاپ زرد برند غبار، مناسب پاییز و زمستان.',
  images: [
    '/assets/images/1-1.jpg',
    '/assets/images/6.jpg',
    '/assets/images/7.jpg',
    '/assets/images/11-1.jpg',
    '/assets/images/123.png',
    // '/assets/images/5-1.jpg',
    // '/assets/images/13-1.jpg',
    // '/assets/images/5-1.jpg',


  ],
  colors: [
    { key: 'black', label: 'مشکی', hex: '#0b0b0b' },
    { key: 'olive', label: 'زیتونی', hex: '#495b3c' },
    { key: 'cream', label: 'کرم', hex: '#d8d0bf' },
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  specs: [
    { k: 'جنس', v: 'دورس سه نخ' },
    { k: 'قد', v: 'استاندارد' },
    { k: 'کلاه', v: 'دارد' },
    { k: 'مناسب فصل', v: 'پاییز / زمستان' },
  ],
  description:
    'این هودی با پارچه دورس و چاپ برند غبار طراحی شده. فیت استاندارد دارد و برای استفاده روزمره بسیار مناسب است.',
};

export default function ProductPage({ params }) {
  // slug فعلاً فقط برای نمایش؛ بعداً API call بر اساس params.slug
  const product = MOCK_PRODUCT;

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [color, setColor] = useState(product.colors[0]?.key || null);
  const [size, setSize] = useState(product.sizes[1] || null);
  const [qty, setQty] = useState(1);

  const finalPrice = useMemo(() => product.price, [product.price]);

  return (
    <main className="rg-product-page">
      <div className="rg-product-container">
        {/* breadcrumb ساده */}
        <nav className="rg-breadcrumb">
          <a href="/">خانه</a>
          <span>/</span>
          <a href="/shop">فروشگاه</a>
          <span>/</span>
          <span className="current">{product.title}</span>
        </nav>

        <section className="rg-product-top">
          {/* گالری */}
          <div className="rg-product-gallery-area">
            <ProductGallery
              images={product.images}
              selected={selectedImage}
              onSelect={setSelectedImage}
            />
          </div>

          {/* اطلاعات و انتخاب‌ها */}
          <div className="rg-product-info-area">
            <ProductInfo
              product={product}
              color={color}
              setColor={setColor}
              size={size}
              setSize={setSize}
              qty={qty}
              setQty={setQty}
              finalPrice={finalPrice}
            />
          </div>
        </section>

        {/* تب‌ها: توضیحات/مشخصات/نظرات */}
        <section className="rg-product-tabs-area">
          <ProductTabs
            description={product.description}
            specs={product.specs}
            reviewCount={product.reviewCount}
          />
        </section>

        {/* محصولات مرتبط */}
        <section className="rg-related-area">
          <RelatedProducts />
        </section>
      </div>
    </main>
  );
}

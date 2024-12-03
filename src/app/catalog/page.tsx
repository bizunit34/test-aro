import { Typography } from '@mui/material';
import Image from 'next/image';

export default function Catalog() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main className=''>
        <Typography variant='h4' gutterBottom>
          Catalog
        </Typography>
        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          <ul className='Group_Group__products___QdqQ'>
            <li>
              <div className='Product_Product__1kGdE Group_Group__product__3AjLJ'>
                <a
                  className='Product_Product__image__root__pDmZL'
                  href='/shop/soft-touch-mylar-bags-all-sizes-available?item=Soft%20Touch%20Mylar%20Bags%20(All%20Sizes%20Available)%20'
                >
                  <span className='Product_Product__image__wrapper__hpVMz'>
                    <Image
                      src='https://aroconnection-com-strapi-bucket.s3.us-east-1.amazonaws.com/Aro_Plastic_Bag_1_7f98176006.jpg'
                      alt='White mylar bag mockup ARO your brand here text soft touch'
                      loading='lazy'
                      decoding='async'
                      data-nimg='fill'
                      className='Product_Product__image__18UqM'
                      unoptimized
                      height={100}
                      width={100}
                    />
                  </span>
                </a>
                <div className='Prose_Prose__dIPtt prose prose-headings:font-heading Product_Product__caption___rS2a'>
                  <p className='lead'>
                    Soft Touch Mylar Bags (All Sizes Available)
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className='Product_Product__1kGdE Group_Group__product__3AjLJ'>
                <a
                  className='Product_Product__image__root__pDmZL'
                  href='/shop/glossy-mylar-bags-all-sizes-available?item=Glossy%20Mylar%20Bags%20(All%20Sizes%20Available)%20'
                >
                  <span className='Product_Product__image__wrapper__hpVMz'>
                    <Image
                      src='https://aroconnection-com-strapi-bucket.s3.us-east-1.amazonaws.com/Aro_Plastic_Bag_1_7f98176006.jpg'
                      alt='Black mylar bag mockup ARO your brand here text'
                      loading='lazy'
                      decoding='async'
                      data-nimg='fill'
                      className='Product_Product__image__18UqM'
                      height={100}
                      width={100}
                      unoptimized
                    />
                  </span>
                </a>
                <div className='Prose_Prose__dIPtt prose prose-headings:font-heading Product_Product__caption___rS2a'>
                  <p className='lead'>
                    Glossy Mylar Bags (All Sizes Available)
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

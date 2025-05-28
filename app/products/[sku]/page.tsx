// app/products/[sku]/page.tsx

import AddToCartBtn from '@/app/component/AddToCart';
import MediaCarousel from '@/app/component/MediaCarousel';
import { safeAddToCart } from '@/app/lib/cart';
import { fetchProduct } from '@/app/lib/magento';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import 'react-icons/md'
import { MdShoppingCartCheckout } from 'react-icons/md';

interface ProductPageProps {
  params: {
    sku: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  let isConfigurable = false;
  const { sku } = params;
  const product = await fetchProduct(sku);
  if (product && product['configurable_options']) {
    isConfigurable = true;
  }
  const validImages = product.media_gallery?.filter((img: any) => !img.disabled) || [];
  return (
    <div className="min-h-screen w-full bg-[#0e0e10] text-white p-8 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-[#1a1a1d] rounded-xl shadow-lg p-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="flex-shrink-0">
            {product.image?.url ? (
              <MediaCarousel images={validImages} />
            ) : (
              <div className="w-80 h-80 flex items-center justify-center border border-gray-700 rounded-lg text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
              <span className="text-xs px-2 py-1 border border-gray-600 rounded-md text-gray-400">
                {isConfigurable ? 'Configurable Product' : 'Simple Product'}
              </span>
              <p className="text-sm text-gray-400 mt-2">SKU: #{product.sku}</p>
            </div>

            <div className="text-gray-300 text-sm">
              <div dangerouslySetInnerHTML={{ __html: product.description.html }} />
            </div>

            <div className="flex items-center justify-evenly gap-2 text-xl font-semibold text-green-400">
              <div className='flex items-end'>
                <span className="text-gray-400 text-base">
                  <DollarSign />
                </span>
                <span>{product.price_range.minimum_price.regular_price.value}</span>
              </div>
              <div className='mb-4'>
                <AddToCartBtn 
                  sku={sku}
                  isConfigurable={isConfigurable}
                  selectedOptions={{}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Configurable Options */}
        {isConfigurable && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">
              Available Options
            </h2>
            {product.configurable_options.map((option: any) => (
              <div key={option.id} className="text-left space-y-2">
                <h3 className="text-lg font-medium text-gray-300">{option.label}</h3>
                <div className="flex flex-wrap gap-3">
                  {option.values.map((value: any) => (
                    <div
                      key={value.value_index}
                      className="px-4 py-2 rounded-lg border border-gray-600 cursor-pointer hover:border-white transition-all duration-200 text-sm"
                      style={
                        value.swatch_data?.value
                          ? {
                            backgroundColor: value.swatch_data.value,
                            color: '#fff',
                            border: '1px solid #444',
                          }
                          : {}
                      }
                    >
                      {value.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

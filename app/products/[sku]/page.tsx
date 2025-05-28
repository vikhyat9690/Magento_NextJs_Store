// app/products/[sku]/page.tsx

import ConfigurableSelector from '@/app/component/ConfigurableSelector';
import MediaCarousel from '@/app/component/MediaCarousel';
import { fetchProduct } from '@/app/lib/magento';
import { DollarSign } from 'lucide-react';

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
      <div className="w-full max-w-5xl bg-[#1a1a1d] rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-[350px]">
            {product.image?.url ? (
              <MediaCarousel images={validImages} />
            ) : (
              <div className="w-full h-80 flex items-center justify-center border border-gray-700 rounded-lg text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-1 border border-gray-600 rounded-md text-gray-400">
                  {isConfigurable ? 'Configurable Product' : 'Simple Product'}
                </span>
                <span className="text-sm text-gray-500">SKU: #{product.sku}</span>
              </div>
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <div dangerouslySetInnerHTML={{ __html: product.description.html }} />
            </div>

            <div className="text-lg font-semibold text-green-400 flex items-center gap-2">
              <DollarSign className="text-base text-gray-400" />
              <span>{product.price_range.minimum_price.regular_price.value}</span>
            </div>

            {/* Configurable Selector */}
            {isConfigurable && (
              <ConfigurableSelector
                options={product.configurable_options}
                sku={product.sku}
              />
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

import axios from 'axios';

interface Product {
  id: number,
  name: string,
  sku: string,
  image: { url: string },
  price: {
    regularPrice: {
      amount: {
        value: number,
        currency: string
      }
    }
  }
}

interface FetchProductResult {
  products: Product[],
  totalPages: number
}

export async function fetchProducts(currentPage: number = 1, filters: any = {}): Promise<FetchProductResult> {
  const pageSize = 8;
  const query = `
  {
    products(
      search: "", 
      pageSize: ${pageSize}, currentPage: ${currentPage},
      filter: {
        ${filters.price_from ? `price: { from: "${filters.price_from}", to: "${filters.price_to || 100}" }` : ""}
      }  
      ) 
      {
        total_count
        items {
           id
           name
           price {
             regularPrice {
               amount {
                 value
                 currency
               }
             }
           }
           image {
               url
           }
           sku
         }
      }
    }
  `;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await axios.post(`${baseUrl}/api/magento`, { query });
    const data = response.data.data.products;
    const totalPages = Math.ceil(data.total_count / pageSize);
    return { products: data.items, totalPages };
  } catch (error) {
    console.log(error);
    return { products: [], totalPages: 0 };
  }
}


export async function fetchProduct(sku: string) {
  const NEXT_URI = process.env.NEXT_FRONTEND_URI!;
  // const query = `
  // {
  //   products(filter: { sku: { eq: "${sku}" } }) {
  //     items {
  //       id
  //       name
  //       price {
  //         regularPrice {
  //           amount {
  //             value
  //             currency
  //           }
  //         }
  //       }
  //       image {
  //           url
  //       }
  //       sku
  //     }
  //   }
  // }
  //   `;
  const query = `
{
  products(filter: { sku: { eq: "${sku}" } }) {
    items {
      id
      name
      sku
      description {
        html
      }
      image {
        url
        label
      }
      media_gallery {
        url
        label
        disabled
        position
      }
      price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
        }
      }
      ... on ConfigurableProduct {
        configurable_options {
          id
          attribute_id
          label
          values {
            value_index
            label
            swatch_data {
              value
              ... on ImageSwatchData {
                thumbnail
              }
              ... on ColorSwatchData {
                value
              }
            }
          }
          product_id
        }
        variants {
          product {
            id
            sku
            name
            price_range {
              minimum_price {
                regular_price {
                  value
                  currency
                }
              }
            }
            stock_status
          }
          attributes {
            code
            value_index
          }
        }
      }
    }
  }
}
`;

  const URI = NEXT_URI + '/api/magento';
  try {
    const res = await axios.post(URI, { query });
    return res.data?.data?.products?.items?.[0];
  } catch (error: any) {
    console.log(error.message);
  }
}
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
// import sampleData from '@/db/sample-data';
import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

export const metadata = {
  title: 'Home'
}

const Homepage = async () => {
  const latestProducts = await getLatestProducts()
  // await delay(2000)
  // console.log(sampleData)
  return (
    <>
      <ProductList data={latestProducts} title='Newest Arrivals' limit={4} />
    </>
  );
}

export default Homepage;
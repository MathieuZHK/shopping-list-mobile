import ProductDto from '../product/ProductDto';

interface ShoppingListDto {
  id: string;
  name: string;
  userId: string;
  owner: string;
  productList: ProductDto[];
}

export default ShoppingListDto;

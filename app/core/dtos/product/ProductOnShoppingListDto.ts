import ProductDto from './ProductDto';

interface ProductOnShoppingListDto {
  id: string;
  shoppingListId: string;
  product: ProductDto;
}

export default ProductOnShoppingListDto;

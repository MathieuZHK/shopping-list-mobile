interface ShowProductOnShoppingListDto {
  id: string;
  name: string;
  shoppingListId: string;
  qty: number;
  price: number;
  inCart: boolean;
}

export default ShowProductOnShoppingListDto;

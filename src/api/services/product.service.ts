class ProductService {
  /**
   * Get similar products for a given ID
   * @param productId - Product ID.
   */

  public async getSimilarProducts(productId: string) {
    console.log(`[ProductService] Iniciando búsqueda para: ${productId}`);

    // const similarIds = await productClient.getSimilarProductIds(productId);

    // if (!similarIds || similarIds.length === 0) {
    //   return [];
    // }

    // const productDetails = await ... (Promise.allSettled)

    const mockData = [
      {
        id: "123",
        name: "Producto Falso 1 (desde Servicio)",
        price: 10.0,
        availability: true,
      },
      {
        id: "456",
        name: "Producto Falso 2 (desde Servicio)",
        price: 20.0,
        availability: false,
      },
    ];

    return mockData;
  }
}

export const productService = new ProductService();

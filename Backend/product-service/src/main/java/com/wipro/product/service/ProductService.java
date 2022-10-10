package com.wipro.product.service;

import java.util.List;

import com.wipro.product.beans.ProductStocks;
import com.wipro.product.entity.Product;

public interface ProductService {

	List<Product> getAllProducts();

	List<Product> getAllProductsByCategory(String category);

	Integer addProduct(Product product);

	Integer updateProduct(Product product);

	void deleteProduct(Integer productId);

	List<Product> addAllProducts(List<Product> productList);

	List<ProductStocks> getProductStocks();

	List<Product> getProductById(Integer id);
	List<Product> findByNameStartsWith(String name);

}

package com.wipro.product.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wipro.product.beans.ProductStocks;
import com.wipro.product.entity.Product;
import com.wipro.product.repository.ProductRepository;

@Repository
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductRepository productRepository;
	
	@Override
	public List<Product> getAllProducts(){
		return productRepository.findAll();
	}
	
	@Override
	public List<Product> getAllProductsByCategory(String category){
		return productRepository.findByCategory(category.toUpperCase());
	}

	@Override
	public Integer addProduct(Product product) {
		product.setCategory(product.getCategory().toUpperCase());
		return productRepository.save(product).getProductId();
	}

	@Override
	public Integer updateProduct(Product product) {
		return productRepository.save(product).getProductId();
	}

	@Override
	public void deleteProduct(Integer productId) {
		productRepository.delete(productRepository.findByProductId(productId).get(0));
	}

	@Override
	public List<Product> addAllProducts(List<Product> productList) {
		return productRepository.saveAll(productList);
	}

	@Override
	public List<ProductStocks> getProductStocks() {
		List<Product> productList = productRepository.findAll();
		List<ProductStocks> productStocksList = new ArrayList<>();
		productList.forEach(product -> {
			productStocksList.add(new ProductStocks(product.getName(), product.getStock()));
		});
		return productStocksList;
	}

	@Override
	public List<Product> getProductById(Integer id) {
		return productRepository.findByProductId(id);
	}

	@Override
	public List<Product> findByNameStartsWith(String name) {
		return productRepository.findByNameContainingIgnoreCase(name);
	}

}

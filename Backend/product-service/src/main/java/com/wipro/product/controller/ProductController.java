package com.wipro.product.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.product.beans.ProductStocks;
import com.wipro.product.entity.Product;
import com.wipro.product.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	@GetMapping("product")
	public List<Product> getProductById(@RequestParam Integer id) {
		log.info("Getting product by Id");
		return productService.getProductById(id);
	}
	
	@GetMapping("products")
	public List<Product> getAllProducts() {
		log.info("Getting all products");
		return productService.getAllProducts();
	}
	
	@GetMapping("products/category")
	public List<Product> getAllProductsByCategory(@RequestParam String category) {
		log.info("getting products by category");
		return productService.getAllProductsByCategory(category);
	}
	
	@PostMapping("add/product")
	public Integer addProduct(@RequestBody Product product) {
		log.info("Adding product");
		return productService.addProduct(product);
	}
	
	@PutMapping("update/product")
	public Integer updateProduct(@RequestBody Product product) {
		log.info("Updating product");
		return productService.updateProduct(product);
	}
	
	@DeleteMapping("delete/product")
	public void deleteProduct(@RequestParam Integer productId) {
		log.info("Deleting product");
		productService.deleteProduct(productId);
	}
	
	@PostMapping("add/products")
	public List<Product> addProducts(@RequestBody String products) {
		log.info("Adding multiple products from CSV");
		String[] strArr = products.split(",");
		List<Product> productList = new ArrayList<>();
		for(int i=0; i<strArr.length; i+=6) {
			Product product = new Product();
			product.setName(strArr[i]);
			product.setPrice(strArr[i+1]);
			product.setDescription(strArr[i+2]);
			product.setCategory(strArr[i+3]);
			product.setStock(Integer.parseInt(strArr[i+4]));
			product.setImageURL(strArr[i+5]);
			productList.add(product);
		}
		return productService.addAllProducts(productList);
	}
	
	@GetMapping("stocks")
	public List<ProductStocks> getProductStocks() {
		log.info("Fetchingproduct stocks details");
		return productService.getProductStocks();
	}
	
	@GetMapping("products/{name}")
	public List<Product> getProductByName(@PathVariable("name")String name) {
		log.info("Fetchingproduct details by searching similar products");
		return productService.findByNameStartsWith(name);
	}

}

package com.wipro.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	public List<Product> findByCategory(String category);
	List<Product> findByProductId(Integer productId);
	
//	@Query("SELECT p FROM PRODUCTS p WHERE LOWER(p.name) LIKE %:name%")
//	List<Product> findByNameStartsWith(String name);
	
	List<Product> findByNameContainingIgnoreCase(String name);

}

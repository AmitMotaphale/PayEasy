package com.payeasy.merchantproduct.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payeasy.merchantproduct.entity.Product;
import com.payeasy.merchantproduct.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	public Product addProduct(Product product) {
		product.setCreatedAt(new Timestamp(System.currentTimeMillis()));
		return productRepository.save(product);
	}
	public List<Product> getProductsByMerchant(Long merchantId){
		return productRepository.findByMerchantId(merchantId);
	}
	public Optional<Product> getProductById(Long productId) {
		return productRepository.findById(productId);
	 } 
	public Product updateProduct(Long productId, Product productDetails) {
        Optional<Product> optProduct = productRepository.findById(productId);
        if (optProduct.isPresent()) {
            Product product = optProduct.get();
            product.setProductName(productDetails.getProductName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            return productRepository.save(product);
        }
        return null;
	}
	
	public boolean deleteProduct(Long productId) {
		Optional<Product> optProd= productRepository.findById(productId);
		if(optProd.isPresent()) {
			productRepository.deleteById(productId); //Payeasy jpa crud Operation 
			return true;
		}
		return false;
	}
}

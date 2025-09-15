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

    // Add new product
    public Product addProduct(Product product) {
        product.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return productRepository.save(product);
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get all products for a merchant
    public List<Product> getProductsByMerchant(Long merchantId) {
        return productRepository.findByMerchantId(merchantId);
    }

    // Get product by ID
    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    // Update product by ID
    public Product updateProduct(Long productId, Product productDetails) {
        if (productDetails == null) {
            throw new IllegalArgumentException("Product details cannot be null");
        }

        Optional<Product> optProduct = productRepository.findById(productId);
        if (optProduct.isEmpty()) {
            return null; // Or throw custom exception
        }

        Product product = optProduct.get();

        // Only update relevant fields
        product.setProductName(productDetails.getProductName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());

        // Optionally update timestamp if needed
        // product.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return productRepository.save(product);
    }

    // Delete product by ID
    public boolean deleteProduct(Long productId) {
        Optional<Product> optProd = productRepository.findById(productId);
        if (optProd.isPresent()) {
            productRepository.deleteById(productId); // JPA CRUD delete
            return true;
        }
        return false;
    }
}

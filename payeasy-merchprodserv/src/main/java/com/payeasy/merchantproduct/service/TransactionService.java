package com.payeasy.merchantproduct.service;

import com.payeasy.merchantproduct.controller.ProductController;
import com.payeasy.merchantproduct.entity.Product;
import com.payeasy.merchantproduct.entity.Transaction;
import com.payeasy.merchantproduct.repository.ProductRepository;
import com.payeasy.merchantproduct.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final ProductController productController;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ProductRepository productRepository;

    TransactionService(ProductController productController) {
        this.productController = productController;
    }

    public Transaction buyProduct(Long userId, String userName, String userEmail,
                                  Long productId, int quantity) throws Exception {

        Optional<Product> optProduct = productRepository.findById(productId);
        if (optProduct.isEmpty()) {
            throw new Exception("Product not found");
        }

        Product product = optProduct.get();

        if (product.getQuantity() < quantity) {
            throw new Exception("Insufficient stock available");
        }

        // Reduce stock
        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);

        // Create transaction
        Transaction tx = new Transaction();
        tx.setUserId(userId);
        tx.setUserName(userName);
        tx.setUserEmail(userEmail);
        tx.setMerchantId(product.getMerchantId());
        tx.setProductId(productId);
        tx.setQuantityBought(quantity);
        tx.setTotalAmount(product.getPrice() * quantity);
        tx.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return transactionRepository.save(tx);
    }

    public List<Transaction> getTransactionsByMerchant(Long merchantId) {
        return transactionRepository.findByMerchantId(merchantId);
    }

    public List<Transaction> getTransactionsByUser(Long userId) {
        return transactionRepository.findByUserId(userId);
    }
}

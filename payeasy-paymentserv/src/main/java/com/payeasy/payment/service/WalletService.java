package com.payeasy.payment.service;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.payeasy.payment.dto.WalletRequest;
import com.payeasy.payment.dto.WalletTransactionResponse;
import com.payeasy.payment.entity.Transaction;
import com.payeasy.payment.entity.Wallet;
import com.payeasy.payment.repository.WalletRepository;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionService transactionService;

    public Wallet createWallet(Long userId) {
        Wallet wallet = new Wallet();
        wallet.setUserId(userId);
        wallet.setBalance(0.0);
        wallet.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return walletRepository.save(wallet);
    }

    public Optional<Wallet> getWalletByUserId(Long userId) {
        return walletRepository.findByUserId(userId);
    }

    public WalletTransactionResponse addFunds(Long userId, WalletRequest request) {
        Optional<Wallet> walletOpt = walletRepository.findByUserId(userId);
        if (walletOpt.isEmpty()) return null;

        Wallet wallet = walletOpt.get();
        wallet.setBalance(wallet.getBalance() + request.getAmount());
        wallet.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        walletRepository.save(wallet);

        Transaction txn = new Transaction();
        txn.setUserId(userId);
        txn.setWalletId(wallet.getWalletId());
        txn.setBankId(request.getBankId());
        txn.setTxnType("CREDIT");
        txn.setAmount(request.getAmount());
        txn.setStatus("SUCCESS");
        txn.setDescription(request.getDescription() != null ? request.getDescription() : "Funds added to wallet");
        transactionService.createTransaction(txn);

        return new WalletTransactionResponse(wallet, txn);
    }

    public WalletTransactionResponse deductFunds(Long userId, WalletRequest request) {
        Optional<Wallet> walletOpt = walletRepository.findByUserId(userId);
        if (walletOpt.isEmpty()) return null;

        Wallet wallet = walletOpt.get();
        if (wallet.getBalance() < request.getAmount()) {
            return null;
        }

        wallet.setBalance(wallet.getBalance() - request.getAmount());
        wallet.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        walletRepository.save(wallet);

        Transaction txn = new Transaction();
        txn.setUserId(userId);
        txn.setWalletId(wallet.getWalletId());
        txn.setBankId(request.getBankId());
        txn.setMerchantId(request.getMerchantId());
        txn.setTxnType("DEBIT");
        txn.setAmount(request.getAmount());
        txn.setStatus("SUCCESS");
        txn.setDescription(request.getDescription() != null ? request.getDescription() : "Payment from wallet");
        transactionService.createTransaction(txn);

        return new WalletTransactionResponse(wallet, txn);
    }
}

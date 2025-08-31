package com.payeasy.merchantproduct.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payeasy.merchantproduct.entity.Merchant;
import com.payeasy.merchantproduct.repository.MerchantRepository;

@Service
public class MerchantService {
	@Autowired
    private MerchantRepository merchantRepository;

    public Merchant addMerchant(Merchant merchant) {
        merchant.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return merchantRepository.save(merchant);
    }

    public List<Merchant> getAllMerchants() {
        return merchantRepository.findAll();
    }

    public Optional<Merchant> getMerchantById(Long merchantId) {
        return merchantRepository.findById(merchantId);
    }

    public Merchant updateMerchant(Long merchantId, Merchant merchantDetails) {
        Optional<Merchant> optMerchant = merchantRepository.findById(merchantId);
        if (optMerchant.isPresent()) {
            Merchant merchant = optMerchant.get();
            merchant.setMerchantName(merchantDetails.getMerchantName());
            merchant.setContactNumber(merchantDetails.getContactNumber());
            merchant.setEmail(merchantDetails.getEmail());
            return merchantRepository.save(merchant);
        }
        return null;
    }

    public boolean deleteMerchant(Long merchantId) {
        Optional<Merchant> optMerchant = merchantRepository.findById(merchantId);
        if (optMerchant.isPresent()) {
            merchantRepository.deleteById(merchantId);
            return true;
        }
        return false;
    }
}
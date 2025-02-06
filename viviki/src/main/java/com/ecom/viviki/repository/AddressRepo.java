package com.ecom.viviki.repository;

import com.ecom.viviki.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address, Long> {
}

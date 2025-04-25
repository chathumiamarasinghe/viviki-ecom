package com.second.Eccormerce.service.impl;

import com.second.Eccormerce.entity.Product;
import com.second.Eccormerce.repository.ProductRepo;
import com.second.Eccormerce.service.interf.ProductReportService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;

@Service
public class ProductReportServiceImpl implements ProductReportService {

    @Autowired
    private ProductRepo productRepo;

    @Override
    public byte[] exportReport() throws Exception {
        // Load the .jrxml file
        InputStream reportStream = new ClassPathResource("reports/product_report.jrxml").getInputStream();
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // Fetch products from DB
        List<Product> products = productRepo.findAll();

        // Transform into data source matching .jrxml field names
        List<Map<String, Object>> productList = new ArrayList<>();
        for (Product product : products) {
            Map<String, Object> map = new HashMap<>();
            map.put("productId", String.valueOf(product.getId()));
            map.put("productName", product.getName());
            map.put("category", product.getCategory() != null ? product.getCategory().getName() : "Uncategorized");
            map.put("price", product.getPrice() != null ? product.getPrice().toString() : "0.00");
            map.put("quantity", product.getQuantity() != null ? product.getQuantity().toString() : "0");
            productList.add(map);
        }

        // Create the data source
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(productList);

        // Fill and export
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, new HashMap<>(), dataSource);
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}

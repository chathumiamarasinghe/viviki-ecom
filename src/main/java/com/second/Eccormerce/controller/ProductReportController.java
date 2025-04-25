package com.second.Eccormerce.controller;

import com.second.Eccormerce.service.interf.ProductReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report")
public class ProductReportController {

    @Autowired
    private ProductReportService productReportService;

    @GetMapping("/products")
    public ResponseEntity<byte[]> generateProductReport() {
        try {
            byte[] pdfReport = productReportService.exportReport();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("inline")
                    .filename("product_report.pdf")
                    .build());

            return new ResponseEntity<>(pdfReport, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

package com.second.Eccormerce.controller;

import com.second.Eccormerce.service.impl.ReportServiceImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportController {

    private final ReportServiceImpl reportService;

    public ReportController(ReportServiceImpl reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/api/report/orderitems")
    public ResponseEntity<byte[]> generateOrderItemsReport() {
        try {
            byte[] pdfContent = reportService.exportOrderReport("orderlist_report.jrxml");

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=orderReport.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // New report generation
    @GetMapping("/api/report/orderhistory")
    public ResponseEntity<byte[]> generateOrderHistoryReport() {
        try {
            byte[] pdfContent = reportService.exportOrderHistoryReport("order_history_report.jrxml");
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=OrderHistoryReport.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/api/report/productlist")
    public ResponseEntity<byte[]> generateProductListReport() {
        try {
            byte[] pdfContent = reportService.exportProductReport("productlist_report.jrxml");
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ProductListReport.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }


    @GetMapping("/api/report/userdetails")
    public ResponseEntity<byte[]> generateUserDetailsReport() {
        try {
            byte[] pdfContent = reportService.exportUserReport("userdetails_report.jrxml");
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=OrderHistoryReport.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/api/report/categorylist")
    public ResponseEntity<byte[]> generateCategoryListReport() {
        try {
            byte[] pdfContent = reportService.exportCategoryReport("categorylist_report.jrxml");
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=OrderHistoryReport.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/api/report/materiallist")
    public ResponseEntity<byte[]> generateMaterialListReport() {
        try {
            byte[] pdfContent = reportService.exportMaterialReport("materiallist_report.jrxml");
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=OrderHistoryReport.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}


package com.second.Eccormerce.service.impl;

import net.sf.jasperreports.engine.*;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;

@Service
public class ReportServiceImpl {

    private final DataSource dataSource;

    public ReportServiceImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public byte[] exportOrderReport(String reportName) throws JRException, SQLException {
        return exportReport(reportName);
    }

    public byte[] exportOrderHistoryReport(String reportName) throws JRException, SQLException {
        return exportReport(reportName);
    }

    public byte[] exportProductReport(String reportName) throws JRException, SQLException {
        return exportReport(reportName);
    }

    public byte[] exportUserReport(String reportName) throws JRException, SQLException {
        return exportReport(reportName);
    }

    public byte[] exportCategoryReport(String reportName) throws JRException, SQLException {
        return exportReport(reportName);
    }

    public byte[] exportMaterialReport(String reportName) throws JRException, SQLException {
        return exportReport(reportName);
    }

    // Common method to export a report based on the JRXML file
    private byte[] exportReport(String reportName) throws JRException, SQLException {
        // Load the JRXML file dynamically based on the report name
        InputStream reportStream = getClass().getResourceAsStream("/reports/" + reportName);

        if (reportStream == null) {
            throw new JRException("Report file not found: " + reportName);
        }

        // Compile the report
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // Fill the report with data from the database
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, new HashMap<>(), dataSource.getConnection());

        // Export the filled report to PDF
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}

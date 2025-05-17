package com.second.Eccormerce.service.impl;

import net.sf.jasperreports.engine.*;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

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

    public byte[] exportProductReport(String reportName, Map<String, Object> parameters) throws JRException, SQLException {
        return exportReport(reportName, parameters);
    }


    public byte[] exportUserReport(String reportName) throws JRException, SQLException {
        return exportReport(reportName);
    }

    public byte[] exportCategoryReport(String reportName) throws JRException, SQLException {
        return exportReport(reportName);
    }

    public byte[] exportMaterialReport(String reportName, String materialType, Integer quantity) throws JRException, SQLException {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("MATERIAL_TYPE", materialType);
        parameters.put("QUANTITY", quantity);
        return exportReport(reportName, parameters);
    }


    // Common method to export a report based on the JRXML file
    private byte[] exportReport(String reportName, Map<String, Object> parameters) throws JRException, SQLException {
        InputStream reportStream = getClass().getResourceAsStream("/reports/" + reportName);

        if (reportStream == null) {
            throw new JRException("Report file not found: " + reportName);
        }

        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource.getConnection());

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    private byte[] exportReport(String reportName) throws JRException, SQLException {
        return exportReport(reportName, new HashMap<>());
    }


}

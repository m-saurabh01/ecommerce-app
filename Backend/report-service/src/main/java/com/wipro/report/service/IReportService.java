package com.wipro.report.service;

import java.util.List;

import com.wipro.report.entity.Report;

public interface IReportService {

	Report addReport(Report report);
	
	List<Report> getAllReport();
	
	List<Report> getAllReportByMonth();
	
	
}

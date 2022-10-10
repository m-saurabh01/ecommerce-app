package com.wipro.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.report.entity.Report;
import com.wipro.report.repository.IReportRepository;

@Service
public class ReportServiceImpl implements IReportService {

	@Autowired
	IReportRepository reportRepository;
	
	@Override
	public Report addReport(Report report) {
		return reportRepository.save(report);
	}

	@Override
	public List<Report> getAllReport() {
		
		return reportRepository.findAll();
	}

	@Override
	public List<Report> getAllReportByMonth() {
		// TODO Auto-generated method stub
		return null;
	}

}

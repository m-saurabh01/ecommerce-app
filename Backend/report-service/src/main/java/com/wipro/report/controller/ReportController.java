package com.wipro.report.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.report.entity.Report;
import com.wipro.report.service.ReportServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/ReportController")
public class ReportController {
	
	@Autowired
	ReportServiceImpl reportServiceImpl;
	
	@PostMapping("/add-report")
	public Report addReport(@RequestBody Report report) {
		return reportServiceImpl.addReport(report);
	}
	
	@GetMapping("/reports")
	public List<Report> getAllReports(){
		return reportServiceImpl.getAllReport();
	}

}

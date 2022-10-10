package com.wipro.report.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.report.entity.Report;
@Repository
public interface IReportRepository extends JpaRepository<Report,Integer>{

}

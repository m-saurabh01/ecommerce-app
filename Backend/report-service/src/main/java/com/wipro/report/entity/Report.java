package com.wipro.report.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "REPORTS")
@AllArgsConstructor
@NoArgsConstructor
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer orderID;
	private String customerID;
	private double orderValue;
	
	@Temporal(TemporalType.DATE)
	private Date date =new Date(System.currentTimeMillis());
	
}

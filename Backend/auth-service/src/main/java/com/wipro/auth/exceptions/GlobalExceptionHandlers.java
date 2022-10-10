package com.wipro.auth.exceptions;

import java.sql.SQLIntegrityConstraintViolationException;

import org.hibernate.exception.ConstraintViolationException;
import org.hibernate.exception.GenericJDBCException;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.wipro.auth.beans.ExceptionMessage;
import com.wipro.auth.constants.AppConstants;

@RestControllerAdvice
public class GlobalExceptionHandlers {
	
	@ExceptionHandler(value = EmptyPasswordException.class)
	public ResponseEntity<ExceptionMessage> emptyPasswordException(EmptyPasswordException exception) {
		return new ResponseEntity<ExceptionMessage>(new ExceptionMessage(AppConstants.EMPTY_PASSWORD), HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = EmptyUsernameException.class)
	public ResponseEntity<ExceptionMessage> emptyUsernameException(EmptyUsernameException exception) {
		return new ResponseEntity<ExceptionMessage>(new ExceptionMessage(AppConstants.EMPTY_USERNAME), HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = ExistingUserException.class)
	public ResponseEntity<ExceptionMessage> existingUserException(ExistingUserException exception) {
		return new ResponseEntity<ExceptionMessage>(new ExceptionMessage(AppConstants.EXISTING_USER), HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(value = ConstraintViolationException.class)
	public ResponseEntity<Object> constraintViolationException(ConstraintViolationException exception) {
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
	}
	
	@ExceptionHandler(value = SQLIntegrityConstraintViolationException.class)
	public ResponseEntity<Object> sqlIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException exception) {
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
	}
	
	@ExceptionHandler(value = SQLGrammarException.class)
	public ResponseEntity<Object> sqlGrammarException(SQLGrammarException exception) {
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
	}
	
	@ExceptionHandler(value = BadSqlGrammarException.class)
	public ResponseEntity<Object> badSqlGrammarException(BadSqlGrammarException exception) {
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
	}
	
	@ExceptionHandler(value = NotFoundException.class)
	public ResponseEntity<Object> notFoundException(NotFoundException exception) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	@ExceptionHandler(value = GenericJDBCException.class)
	public ResponseEntity<Object> genericJDBCException(GenericJDBCException exception) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	}
	
	@ExceptionHandler(value = NullPointerException.class)
	public ResponseEntity<Object> nullPointerException(NullPointerException exception) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	}
	
}

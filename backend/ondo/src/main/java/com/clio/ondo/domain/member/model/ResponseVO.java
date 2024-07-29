package com.clio.ondo.domain.member.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class ResponseVO<T> {
	private boolean success;
	private String message;
	private T data;

	public ResponseVO() {}

	public ResponseVO(boolean success, String message, T data) {
		this.success = success;
		this.message = message;
		this.data = data;
	}

	public static <T> ResponseVO<T> success(String message) {
		return new ResponseVO<>(true, message, null);
	}

	public static <T> ResponseVO<T> success(String message, T data) {
		return new ResponseVO<>(true, message, data);
	}

	public static <T> ResponseVO<T> success(T data) {
		return new ResponseVO<>(true, "Success", data);
	}

	public static <T> ResponseVO<T> failure(String message) {
		return new ResponseVO<>(false, message, null);
	}
}

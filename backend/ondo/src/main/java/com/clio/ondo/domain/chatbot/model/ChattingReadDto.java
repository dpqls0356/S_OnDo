package com.clio.ondo.domain.chatbot.model;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChattingReadDto {
	private String content;
	private String sender;
	private LocalDateTime createdAt;
}

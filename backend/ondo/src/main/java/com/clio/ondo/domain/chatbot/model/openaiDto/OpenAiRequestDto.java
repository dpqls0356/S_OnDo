package com.clio.ondo.domain.chatbot.model.openaiDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OpenAiRequestDto {
    private String model;
    private RoleContentMessage[] roleContentMessages;
}

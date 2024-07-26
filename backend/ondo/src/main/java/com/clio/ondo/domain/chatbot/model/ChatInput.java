package com.clio.ondo.domain.chatbot.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ChatInput {
    private Long member_id;
    private String message;
}

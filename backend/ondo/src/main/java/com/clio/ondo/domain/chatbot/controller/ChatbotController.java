package com.clio.ondo.domain.chatbot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.chatbot.service.ChatbotService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatbotController {
	private final ChatbotService chatbotService;
}

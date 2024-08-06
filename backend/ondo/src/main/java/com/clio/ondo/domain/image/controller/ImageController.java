package com.clio.ondo.domain.image.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.clio.ondo.domain.image.service.ImageService;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequestMapping("/api/v1/image")
@RestController
@RequiredArgsConstructor
public class ImageController {

	private final ImageService imageService;

	@PostMapping("/upload")
	public String upload(@RequestParam("data")MultipartFile file) throws IOException{
		return imageService.upload(file,"static");
	}
}

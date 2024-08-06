package com.clio.ondo.domain.image.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ImageService {

	String upload(MultipartFile multipartFile, String dirName) throws IOException;
	void delete(String imageUrl);
}

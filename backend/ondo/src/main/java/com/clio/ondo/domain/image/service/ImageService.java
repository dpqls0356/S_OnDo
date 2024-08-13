package com.clio.ondo.domain.image.service;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ImageService {

	String upload(MultipartFile multipartFile, String dirName) throws IOException;

	//S3에 업로드하고 url 반환
	String uploadAndMember(MultipartFile uploadFile, String dirName, Long memberId) throws IOException;

	void delete(String imageUrl,String dirName);
}

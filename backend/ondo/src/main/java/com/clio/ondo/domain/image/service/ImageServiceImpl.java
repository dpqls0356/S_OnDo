package com.clio.ondo.domain.image.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

	private final AmazonS3 amazonS3;
	private final MemberRepository memberRepository;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Override
	//MultipartFile 받아서 File로 변환 후 S3에 업로드
	public String upload(MultipartFile multipartFile, String dirName) throws IOException {
		File uploadFile = convert(multipartFile)
			.orElseThrow(() -> new IllegalArgumentException("file 변환 오류"));
		return uploadUrl(uploadFile, dirName);
	}

	//S3에 업로드하고 url 반환
	private String uploadUrl(File uploadFile, String dirName){
		String fileName=dirName+"/"+uploadFile.getName();
		String uploadImageUrl=putS3(uploadFile,fileName);
		
		//여기서 key 뽑아내고 cloudFront domain 넣기
		int startIndex = uploadImageUrl.indexOf(dirName+"/");
		String path = uploadImageUrl.substring(startIndex);
		String UploadImageUrl="https://d1kbrt3q8264bl.cloudfront.net/"+path;
		
		removeNewFile(uploadFile);
		return UploadImageUrl;
	}

	//S3에 업로드하고 url 반환
	@Override
	@Transactional
	public String uploadAndMember(MultipartFile multipartFile, String dirName, Long memberId) throws IOException{
		File uploadFile = convert(multipartFile)
			.orElseThrow(() -> new IllegalArgumentException("file 변환 오류"));
		String url = uploadUrl(uploadFile, dirName);
		Optional<Member> member = memberRepository.findById(memberId);
		if(member.isPresent()){
			member.get().updateProfileUrl(url);
		}
		return url;
	}

	//로컬 서버에서 임시 파일 삭제
	private void removeNewFile(File uploadFile){
		if(uploadFile.delete()){
			log.debug("서버 파일 삭제");
		}else{
			log.debug("서버 파일 삭제 실패");
		}
	}

	//파일 S3에 업로드하고 URL 반환
	private String putS3(File uploadFile, String fileName){
		amazonS3.putObject(new PutObjectRequest(bucket,fileName,uploadFile)
			.withCannedAcl(CannedAccessControlList.PublicRead));

		return amazonS3.getUrl(bucket,fileName).toString();
	}


	// MultipartFile -> File 변환
	private Optional<File> convert(MultipartFile file) throws IOException {

		String originalFilename = file.getOriginalFilename();
		String uuid = UUID.randomUUID().toString();
		String saveFileName = uuid + "_" + originalFilename.replaceAll("\\s", "_");

		File convertFile = new File(saveFileName);

		if (convertFile.createNewFile()) {
			try (FileOutputStream fos = new FileOutputStream(convertFile)) {
				fos.write(file.getBytes());
			}
			return Optional.of(convertFile);
		}
		return Optional.empty();
	}

	@Override
	public void delete(String imageUrl,String dirName){
		try{
			String decodeUrl=extractAndDecodePath(imageUrl,dirName);
			amazonS3.deleteObject(bucket, decodeUrl);
		}catch(UnsupportedEncodingException e){
			System.out.println("디코딩 중 오류가 발생했습니다: " + e.getMessage());
		}

	}


	public static String extractAndDecodePath(String url, String dirName) throws UnsupportedEncodingException {
		// ".com/" 이후의 경로 추출
		int startIndex = url.indexOf(dirName+"/");
		String path = url.substring(startIndex);

		// 경로 전체를 URL 디코딩
		String decodedPath = URLDecoder.decode(path, "UTF-8");

		return decodedPath;
	}


}
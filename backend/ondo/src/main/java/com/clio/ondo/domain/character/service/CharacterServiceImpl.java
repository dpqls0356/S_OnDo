package com.clio.ondo.domain.character.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.character.model.Character;
import com.clio.ondo.domain.character.repository.CharacterRepository;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CharacterServiceImpl implements CharacterService{

	private final CharacterRepository characterRepository;
	private final JwtTokenProvider jwtTokenProvider;

	//캐릭터 가져오기
	@Override
	public Character getCharacters(Long memberId){
		Optional<Character> characterOptional=characterRepository.findByMemberId(memberId);

		if(characterOptional.isPresent()){
			return characterOptional.get();
		}else{
			//예외처리 필요
			// throw new CharacterNotFoundException("캐릭터 조회가 실패했습니다.");
			return null;
		}
	}

	//캐릭터 exp 업데이트
	@Override
	public void updateExp(Long memberId, int exp){
		Optional<Character> characterOptional=characterRepository.findByMemberId(memberId);
		characterOptional.ifPresent(character -> {
			character.increaseExp(exp); // 경험치 증가
			characterRepository.save(character); // 업데이트된 캐릭터 정보 저장
		});
	}

	//이름바꾸기
	@Override
	public void changeName(Long memberId,String newName){
		Optional<Character> characterOptional=characterRepository.findByMemberId(memberId);
		characterOptional.ifPresent(character -> {
			character.updateName(newName); //이름 변경
			characterRepository.save(character); // 업데이트된 캐릭터 정보 저장
		});
	}





}

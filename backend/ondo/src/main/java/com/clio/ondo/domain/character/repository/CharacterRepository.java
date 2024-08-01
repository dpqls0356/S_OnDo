package com.clio.ondo.domain.character.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clio.ondo.domain.character.model.Character;

public interface CharacterRepository extends JpaRepository<Character, Long> {
}

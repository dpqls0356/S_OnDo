package com.clio.ondo.domain.counselor.model.dto;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.member.model.Gender;

import lombok.Builder;

public class CounselorResponseDto {
    private String id;
    private Gender gender;
    private String name;
    private String field;
    private String selfIntroduction;
    private String profileUrl;

    @Builder
    public Counselor toEntity() {
        return Counselor.builder()
                .counselorId(id)
                .selfIntroduction(selfIntroduction)
                .field(field)
                .name(name)
                .profileUrl(profileUrl)
                .build();
    }
}

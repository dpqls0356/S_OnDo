package com.clio.ondo.domain.member.model.dto;

import java.time.LocalDate;

import com.clio.ondo.domain.member.model.Gender;
import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.model.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberJoinRequestDto {
    private String email;
    private String name;
    private String nickname;
    private String password;
    private LocalDate birthDate;
    private String gender;
    private String profileUrl;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .name(name)
                .nickname(nickname)
                .password(password)
                .birthDate(birthDate)
                .gender(Gender.valueOf(gender))
                .role(Role.valueOf("USER"))
                .profileUrl(profileUrl)
                .build();
    }
}

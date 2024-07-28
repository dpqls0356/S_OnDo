package com.clio.ondo.domain.member.model;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class JoinRequestDto {
    private String email;
    private String name;
    private String nickname;
    private String password;
    private LocalDate birthDate;
    private String gender;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .name(name)
                .nickname(nickname)
                .password(password)
                .birthDate(birthDate)
                .gender(Gender.valueOf(gender))
                .role(Role.valueOf("USER"))
                .build();
    }
}

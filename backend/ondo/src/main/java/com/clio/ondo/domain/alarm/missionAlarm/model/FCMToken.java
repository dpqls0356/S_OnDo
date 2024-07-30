package com.clio.ondo.domain.alarm.missionAlarm.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FCMToken {
    private Long memberId;
    private String token;
}

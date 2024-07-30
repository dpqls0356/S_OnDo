package com.clio.ondo.domain.alarm.missionAlarm.controller;

import com.clio.ondo.domain.alarm.missionAlarm.model.FCMToken;
import com.clio.ondo.domain.alarm.missionAlarm.service.MissionAlarmService;
import com.clio.ondo.domain.chatbot.controller.ChatbotController;
import com.clio.ondo.domain.chatbot.model.ChattingReadDto;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AlarmController {
    private final MissionAlarmService missionAlarmService;

    @PostMapping("/api/v1/alarm/token/{memberId}")
    public ResponseEntity<?> setToken(@PathVariable("memberId") Long memberId, @RequestBody FCMToken FCMToken) {
        try{
            missionAlarmService.saveToken(memberId, FCMToken);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new Result<>(true,HttpStatus.OK.value(), "저장에 성공했습니다."));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new Result<>(false, HttpStatus.BAD_REQUEST.value(), "저장에 실패했습니다."));
        }
    }

    @Data
    @Builder
    static class Result<T> {
        boolean success;
        int status;
        T data;
    }
}

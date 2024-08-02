package com.clio.ondo.domain.counseling;

import java.util.Map;
import java.util.UUID;

import javax.annotation.PostConstruct;

import com.clio.ondo.global.ResponseVO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@PropertySource("classpath:openvidu.properties")
@CrossOrigin(origins = "*")
@RestController()
@RequestMapping("/api/v1")
public class Openvidu {

  @Value("${openvidu.url}")
  private String OPENVIDU_URL;

  @Value("${openvidu.secret}")
  private String OPENVIDU_SECRET;

  private OpenVidu openvidu; // OpenVidu 인스턴스를 저장할 변수

  @PostConstruct
  public void init() {
    this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
  }

  @PostMapping("/counseling/sessions")
  public ResponseEntity<ResponseVO<String>> initializeSession(@RequestBody(required = false) Map<String, Object> params)
      throws OpenViduJavaClientException, OpenViduHttpException {
    // ----- 상담사 판단
    if (true) {
      // 임의의 sessionId 생성
      String customSessionId = UUID.randomUUID().toString();
//        String customSessionId  = "testSession";
      // 세션 속성 설정
      SessionProperties properties = SessionProperties.fromJson(params)
          .customSessionId(customSessionId)
          .build();

      Session session = openvidu.createSession(properties);

      // ----- 세션 Id 예약내역에 넣기

      return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("session_id", session.getSessionId()));
    }
    // 잘못된 접근
    else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ResponseVO.failure("세션 생성 실패: 잘못된 접근입니다."));
    }
  }

  @PostMapping("/counseling/sessions/{sessionId}/connections")
  public ResponseEntity<ResponseVO<String>> createConnection(@PathVariable("sessionId") String sessionId,
      @RequestBody(required = false) Map<String, Object> params)
      throws OpenViduJavaClientException, OpenViduHttpException {
    Session session = openvidu.getActiveSession(sessionId); // 세션 id로 활성세션 가져오기
    if (session == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseVO.failure("세션 종료 실패: 세션을 찾을 수 없습니다."));
    }
    ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
    Connection connection = session.createConnection(properties); // ConnectionProperties 객체를 생성
    return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("token", connection.getToken()));
  }
  @PostMapping("/counseling/sessions/{sessionId}/leave")
  public ResponseEntity<ResponseVO<String>> leaveSession(@PathVariable("sessionId") String sessionId,
      @RequestBody Map<String, Object> params)
      throws OpenViduJavaClientException, OpenViduHttpException {
    Session session = openvidu.getActiveSession(sessionId); // 활성 세션을 가져온다.
    if (session == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseVO.failure("세션 종료 실패: 세션을 찾을 수 없습니다."));
    }
    // ---- 상담자라면 종료
    // 요청 본문에서 사용자 ID를 가져오기
    String user = (String) params.get("user");

    // 해당 사용자를 세션에서 강제로 퇴장시킨다.
    session.forceDisconnect(user);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("사용자가 세션에서 퇴장되었습니다."));
  }
}

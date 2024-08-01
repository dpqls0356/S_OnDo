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

  /*
  OpenVidu 세션을 생성
  params에서 세션 속성(=customSessionId)을 가져와 openvidu 세션을 생성하고 생성된 세션 id를 반환

  // 요청을 보낸 사람이 상담사인지 판단 -> 상담사 _id와 counselor_id가 일치해야한다.
  // 상담사일 경우 랜덤
   */
  @PostMapping("/api/sessions")
  public  ResponseEntity<ResponseVO<String>> initializeSession(@RequestBody(required = false) Map<String, Object> params)
      throws OpenViduJavaClientException, OpenViduHttpException {
    //상담사 판단
    if(true){
      // 임의의 sessionId 생성
       String customSessionId = UUID.randomUUID().toString();
//      String customSessionId = "test";

      // 세션 속성 설정
      SessionProperties properties = SessionProperties.fromJson(params)
              .customSessionId(customSessionId)
              .build();
      Session session = openvidu.createSession(properties);
      return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("session_id", session.getSessionId()));
    }
    //잘못된 접근
    else{
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ResponseVO.failure("게시글 삭제 실패 : 잘못된 접근입니다."));
    }
  }

  /*
  sessionId 경로 변수로 전달된 세션 ID를 사용하여 활성 세션을 가져옴
  ConnectionProperties 객체를 생성한 후, 세션에 연결을 추가하고 생성된 연결의 토큰을 응답
   */

  @PostMapping("/api/sessions/{sessionId}/connections")
  public ResponseEntity<ResponseVO<String>> createConnection(@PathVariable("sessionId") String sessionId,
      @RequestBody(required = false) Map<String, Object> params)
      throws OpenViduJavaClientException, OpenViduHttpException {
    Session session = openvidu.getActiveSession(sessionId); //세션 id로 활성세션 가져오기
    if (session == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
    Connection connection = session.createConnection(properties); //ConnectionProperties 객체를 생성
    return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("token", connection.getToken()));
  }

  @PostMapping("/api/sessions/{sessionId}/leave")
  public ResponseEntity<Void> leaveSession(@PathVariable("sessionId") String sessionId,
      @RequestBody Map<String, Object> params)
      throws OpenViduJavaClientException, OpenViduHttpException {
    Session session = openvidu.getActiveSession(sessionId); //활성 세션을 가져온다.
    if (session == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    // 요청 본문에서 사용자 ID를 가져오기
    String user = (String) params.get("user");

    // 해당 사용자를 세션에서 강제로 퇴장시킨다.
    session.forceDisconnect(user);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}

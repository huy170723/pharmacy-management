package com.example.demo.controller.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.util.*;

@RestController
@RequestMapping("/chat") // => /api/chat vì context-path=/api
@CrossOrigin(origins = "http://localhost:3000")
public class ChatAIController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    // ✅ URL CHUẨN – ĐÃ TEST OK
    private static final String GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

    @PostMapping
    public ResponseEntity<Map<String, String>> askAI(
            @RequestBody Map<String, String> request) {

        Map<String, String> result = new HashMap<>();
        String userMessage = request.get("message");

        if (userMessage == null || userMessage.trim().isEmpty()) {
            result.put("reply", "Bạn chưa nhập nội dung cần tư vấn.");
            return ResponseEntity.ok(result);
        }

        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // ===== BODY GỬI GEMINI =====
            Map<String, Object> body = new HashMap<>();

            Map<String, Object> content = new HashMap<>();
            content.put("role", "user");

            Map<String, String> part = new HashMap<>();
            part.put(
                    "text",
                    "Bạn là một dược sĩ chuyên nghiệp. "
                            + "Hãy tư vấn ngắn gọn, dễ hiểu bằng tiếng Việt: "
                            + userMessage);

            content.put("parts", List.of(part));
            body.put("contents", List.of(content));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            // ===== CALL GEMINI =====
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    GEMINI_BASE_URL + "?key=" + geminiApiKey,
                    entity,
                    Map.class);

            Map responseBody = response.getBody();
            if (responseBody == null) {
                result.put("reply", "Không nhận được phản hồi từ AI.");
                return ResponseEntity.ok(result);
            }

            List candidates = (List) responseBody.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                result.put("reply", "AI chưa thể trả lời câu hỏi này.");
                return ResponseEntity.ok(result);
            }

            Map firstCandidate = (Map) candidates.get(0);
            Map contentObj = (Map) firstCandidate.get("content");
            List parts = (List) contentObj.get("parts");

            if (parts == null || parts.isEmpty()) {
                result.put("reply", "AI không tạo được nội dung trả lời.");
                return ResponseEntity.ok(result);
            }

            String botReply = (String) ((Map) parts.get(0)).get("text");
            result.put("reply", botReply.trim());

            return ResponseEntity.ok(result);

        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            result.put("reply", "Lỗi Gemini: " + e.getResponseBodyAsString());
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            result.put("reply", "Lỗi hệ thống: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(result);
        }
    }
}

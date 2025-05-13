package com.example.demo.controller;

import com.example.demo.util.JWTUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    JWTUtilities utilities;

    @GetMapping("/profile")
    public ResponseEntity<String> userAccess(@RequestHeader("Authorization") String authHeader) {
        if (!authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Invalid token format");
        }

        String token = authHeader.substring(7);
        System.out.println("UserController: Authorization header: " + authHeader);
        Map<String, String> data = utilities.validateToken(token);

        if (!"200".equals(data.get("code"))) {
            return ResponseEntity.status(403).body("Invalid or expired token: " + data.get("error"));
        }

        String role = data.get("role");
        if ("Author".equalsIgnoreCase(role)) {
            return ResponseEntity.ok("Welcome User: " + data.get("username"));
        } else {
            return ResponseEntity.status(403).body("Access Denied! USER role required.");
        }
    }
}
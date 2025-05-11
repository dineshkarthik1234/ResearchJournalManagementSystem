package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.JWTUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JWTUtilities utilities;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // CORS Configuration
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000"); // Adjust based on your frontend URL
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("AuthController: Attempting login for username: " + request.getUsername());
        User user = userRepository.findByUsername(request.getUsername());

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("AuthController: Invalid credentials for username: " + request.getUsername());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        String token = utilities.generateToken(user.getUsername(), user.getRole());
        System.out.println("AuthController: Generated JWT token: " + token);

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("token", token);
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        System.out.println("AuthController: Login successful for username: " + user.getUsername());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        System.out.println("AuthController: Registering user: " + user.getUsername());
        System.out.println("AuthController: Request payload: " + user); // Log the full payload for debugging

        // Validate required fields
        if (user.getUsername() == null || user.getPassword() == null || user.getEmail() == null || user.getRole() == null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "All fields are required");
            System.out.println("AuthController: Validation failed - missing fields");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        // Validate role
        String[] validRoles = {"Admin", "Author", "Editor", "Reviewer"};
        boolean isValidRole = false;
        for (String validRole : validRoles) {
            if (validRole.equals(user.getRole())) {
                isValidRole = true;
                break;
            }
        }
        if (!isValidRole) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid role");
            System.out.println("AuthController: Validation failed - invalid role: " + user.getRole());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        // Validate email format
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        if (!Pattern.matches(emailRegex, user.getEmail())) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid email format");
            System.out.println("AuthController: Validation failed - invalid email: " + user.getEmail());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Username already exists");
            System.out.println("AuthController: Validation failed - username exists: " + user.getUsername());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Email already exists");
            System.out.println("AuthController: Validation failed - email exists: " + user.getEmail());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        // Encode password and save user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        System.out.println("AuthController: User registered successfully: " + user.getUsername());

        // Return success response with message and user data
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration successful");
        response.put("user", user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/validate/{token}")
    public Map<String, String> validate(@PathVariable String token) {
        return utilities.validateToken(token);
    }

    @GetMapping("/admin/users")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
        if (!token.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Invalid token format");
        }
        String jwt = token.substring(7);
        Map<String, String> validationResult = utilities.validateToken(jwt);

        if (!"200".equals(validationResult.get("code"))) {
            return ResponseEntity.status(403).body("Invalid or expired token: " + validationResult.get("error"));
        }

        String role = validationResult.get("role");
        if (!"Admin".equalsIgnoreCase(role)) {
            return ResponseEntity.status(403).body("Unauthorized access: Admin role required");
        }

        return ResponseEntity.ok(userRepository.findAll());
    }
}
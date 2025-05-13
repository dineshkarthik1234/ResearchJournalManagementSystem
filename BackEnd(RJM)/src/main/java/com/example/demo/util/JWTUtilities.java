package com.example.demo.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Component
public class JWTUtilities {

    private final SecretKey key;
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    public JWTUtilities() {
        // Generate a secure key for HS512 algorithm
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    public String generateToken(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public Map<String, String> validateToken(String token) {
        Map<String, String> result = new HashMap<>();

        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            Claims claims = claimsJws.getBody();
            String username = claims.getSubject();
            String role = claims.get("role", String.class);

            result.put("code", "200");
            result.put("username", username);
            result.put("role", role);
        } catch (SignatureException e) {
            result.put("code", "401");
            result.put("error", "Invalid JWT signature");
        } catch (ExpiredJwtException e) {
            result.put("code", "401");
            result.put("error", "Token has expired");
        } catch (JwtException e) {
            result.put("code", "401");
            result.put("error", "Invalid token: " + e.getMessage());
        }

        return result;
    }
}
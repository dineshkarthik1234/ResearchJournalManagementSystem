package com.example.demo.util;

import java.util.Base64;
import java.security.SecureRandom;

public class JsonSecretKeyGenerator 
{
    public static void main(String[] args) 
    {
        // Generate a random 32-character string for the api-key
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom secureRandom = new SecureRandom();
        StringBuilder randomKey = new StringBuilder();
        for (int i = 0; i < 32; i++) {
            randomKey.append(characters.charAt(secureRandom.nextInt(characters.length())));
        }

        // Create JSON structure
        String json = "{\"api-key\": \"" + randomKey.toString() + "\"}";

        // Encode to Base64
        String secretKey = Base64.getEncoder().encodeToString(json.getBytes());

        System.out.println("Generated Secret Key: " + secretKey);
    }
}
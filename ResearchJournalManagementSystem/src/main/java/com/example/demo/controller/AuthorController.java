package com.example.demo.controller;

import com.example.demo.model.Submission;
import com.example.demo.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/author")
public class AuthorController {

    @Autowired
    private SubmissionRepository submissionRepository;

    @GetMapping("/submissions")
    public ResponseEntity<List<Submission>> getSubmissions(@RequestParam Long authorId) {
        List<Submission> submissions = submissionRepository.findByAuthorId(authorId);
        return ResponseEntity.ok(submissions);
    }
}
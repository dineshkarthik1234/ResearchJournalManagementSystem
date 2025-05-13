package com.example.demo.controller;

   import com.example.demo.model.Submission;
   import com.example.demo.model.User;
   import com.example.demo.repository.SubmissionRepository;
   import com.example.demo.repository.UserRepository;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.http.ResponseEntity;
   import org.springframework.web.bind.annotation.*;

   import java.util.List;
   import java.util.Set;
   @CrossOrigin(origins = "http://localhost:5173")
   @RestController
   @RequestMapping("/api/submissions")
   public class SubmissionController {

       @Autowired
       private SubmissionRepository submissionRepository;

       @Autowired
       private UserRepository userRepository;

       // Get all submissions (for Editors)
       @GetMapping
       public List<Submission> getAllSubmissions() {
           return submissionRepository.findAll();
       }

       // Get submissions by author ID (for Authors)
       @GetMapping("/author/{authorId}")
       public List<Submission> getSubmissionsByAuthor(@PathVariable Long authorId) {
           return submissionRepository.findByAuthorId(authorId);
       }

       // Get submissions assigned to a reviewer (for Reviewers)
       @GetMapping("/reviewer/{reviewerId}")
       public List<Submission> getSubmissionsForReviewer(@PathVariable Long reviewerId) {
           return submissionRepository.findByReviewerId(reviewerId);
       }

       // Create a new submission (for Authors)
       @PostMapping
       public ResponseEntity<Submission> createSubmission(@RequestBody Submission submission) {
           submission.setStatus("SUBMITTED"); // Default status
           Submission savedSubmission = submissionRepository.save(submission);
           return ResponseEntity.ok(savedSubmission);
       }

       // Update submission status (for Editors)
       @PutMapping("/{id}/status")
       public ResponseEntity<Submission> updateSubmissionStatus(@PathVariable Long id, @RequestBody String status) {
           Submission submission = submissionRepository.findById(id)
                   .orElseThrow(() -> new RuntimeException("Submission not found"));
           submission.setStatus(status);
           Submission updatedSubmission = submissionRepository.save(submission);
           return ResponseEntity.ok(updatedSubmission);
       }

       // Assign a reviewer to a submission (for Editors)
       @PostMapping("/{id}/assign-reviewer/{reviewerId}")
       public ResponseEntity<Submission> assignReviewer(
               @PathVariable Long id,
               @PathVariable Long reviewerId
       ) {
           Submission submission = submissionRepository.findById(id)
                   .orElseThrow(() -> new RuntimeException("Submission not found"));
           User reviewer = userRepository.findById(reviewerId)
                   .orElseThrow(() -> new RuntimeException("Reviewer not found"));

           if (!reviewer.getRole().equals("Reviewer")) {
               throw new RuntimeException("User is not a Reviewer");
           }

           submission.getReviewers().add(reviewer);
           Submission updatedSubmission = submissionRepository.save(submission);
           return ResponseEntity.ok(updatedSubmission);
       }
   }
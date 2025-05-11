package com.example.demo.repository;

   import com.example.demo.model.Submission;
   import org.springframework.data.jpa.repository.JpaRepository;
   import org.springframework.data.jpa.repository.Query;
   import org.springframework.data.repository.query.Param;
   import java.util.List;

   public interface SubmissionRepository extends JpaRepository<Submission, Long> {
       List<Submission> findByAuthorId(Long authorId);

       @Query("SELECT s FROM Submission s JOIN s.reviewers r WHERE r.id = :reviewerId")
       List<Submission> findByReviewerId(@Param("reviewerId") Long reviewerId);
   }